/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.dao;

import app.entity.Todo;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.demoiselle.jee.persistence.crud.AbstractDAO;

/**
 *
 * @author gladson
 */
public class TodoDAO extends AbstractDAO<Todo, String> {

    @PersistenceContext(unitName = "TodoPU")
    protected EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

//    @Transactional
//    @PostConstruct
//    public void init() {
//        if (usuarioDAO.find().getCount() <= 0) {
//            Usuario usu = new Usuario();
//            usu.setEmail("usuario@demoiselle.org");
//            usu.setNome("Usuário");
//            usu.setSenha(MD5.parser("123456"));
//            usu = usuarioDAO.persist(usu);
//            Todo todo = new Todo();
//            todo.setNome("Faxina semanal");
//            todo.setAdiada(0);
//            todo.setDatafim(new Date());
//            todo.setStatus("Criada");
//            todo.setUsuario(usu);
//            persist(todo);
//        }
//    }
}
