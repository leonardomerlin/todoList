/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.dao;

import app.entity.Usuario;
import app.security.Credentials;
import app.util.MD5;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import org.demoiselle.jee.core.api.security.DemoiselleUser;
import org.demoiselle.jee.core.api.security.SecurityContext;
import org.demoiselle.jee.core.api.security.Token;
import org.demoiselle.jee.persistence.crud.AbstractDAO;
import org.demoiselle.jee.security.exception.DemoiselleSecurityException;
import org.demoiselle.jee.security.message.DemoiselleSecurityMessages;

/**
 *
 * @author gladson
 */
public class UsuarioDAO extends AbstractDAO<Usuario, String> {

    @Inject
    private SecurityContext securityContext;

    @Inject
    private DemoiselleUser loggedUser;

    @Inject
    private Token token;

    @Inject
    private DemoiselleSecurityMessages bundle;

    @Inject
    private Logger logger;

    @PersistenceContext(unitName = "TodoPU")
    protected EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    @Override
    protected Predicate[] extractPredicates(MultivaluedMap<String, String> queryParameters, CriteriaBuilder criteriaBuilder, Root<Usuario> root) {
        List<Predicate> predicates = new ArrayList<>();

        if (queryParameters.containsKey("id")) {
            Long id = Long.parseLong(queryParameters.getFirst("id"));
            predicates.add(criteriaBuilder.equal(root.get("id"), id));
        }

        if (queryParameters.containsKey("nome")) {
            String nome = queryParameters.getFirst("nome");
            predicates.add(criteriaBuilder.like(root.get("nome"), "%" + nome + "%"));
        }

        return predicates.toArray(new Predicate[]{});
    }

    public Usuario verifyEmail(String email, String password) {

        CriteriaBuilder builder = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Usuario> query = builder.createQuery(Usuario.class);
        Root<Usuario> from = query.from(Usuario.class);
        TypedQuery<Usuario> typedQuery = getEntityManager().createQuery(
                query.select(from)
                        .where(builder.equal(from.get("email"), email))
        );

        if (typedQuery.getResultList().isEmpty()) {
            throw new DemoiselleSecurityException("Usuário não existe", Response.Status.UNAUTHORIZED.getStatusCode());
        }

        Usuario usu = typedQuery.getResultList().get(0);

        if (usu == null) {
            throw new DemoiselleSecurityException("Usuário não existe", Response.Status.UNAUTHORIZED.getStatusCode());
        }

        if (!usu.getSenha().equalsIgnoreCase(MD5.parser(password))) {
            throw new DemoiselleSecurityException("Senha incorreta", Response.Status.UNAUTHORIZED.getStatusCode());
        }

        return usu;
    }

    @Override
    public Usuario persist(Usuario entity) {
        entity.setSenha(MD5.parser(entity.getSenha()));
        entity.setPerfil("USER");
        return super.persist(entity);
    }

    public String valida(String id) {
        return "Email Validado";
    }

    public String login(Credentials credentials) {

        Usuario usu = verifyEmail(credentials.getUsername(), credentials.getPassword());
        if (usu == null) {
            throw new DemoiselleSecurityException(bundle.invalidCredentials(), Response.Status.UNAUTHORIZED.getStatusCode());
        }

        MultivaluedMap<String, String> values = new MultivaluedHashMap<>();
        values.putSingle("usuario", usu.getId());

        loggedUser.setName(usu.getNome());
        loggedUser.setIdentity("" + usu.getId());
        loggedUser.addRole(usu.getPerfil());

        loggedUser.addParam("Email", usu.getEmail());
        securityContext.setUser(loggedUser);

        return token.getKey();
    }

    public String retoken() {
        loggedUser = securityContext.getUser();
        securityContext.setUser(loggedUser);
        return token.getKey();
    }

}
