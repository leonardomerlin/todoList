/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.service;

import app.dao.UsuarioDAO;
import app.security.Credentials;
import io.swagger.annotations.Api;
import javax.ejb.Asynchronous;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import javax.ws.rs.core.Response;
import org.demoiselle.jee.security.annotation.Authenticated;

/**
 *
 * @author 70744416353
 */
@Api("Auth")
@Path("auth")
@Produces(APPLICATION_JSON)
@Consumes(APPLICATION_JSON)
public class AuthREST {

    @Inject
    private UsuarioDAO dao;

    @POST
    @Asynchronous
    public void login(@Suspended final AsyncResponse asyncResponse, Credentials credentials) {
        asyncResponse.resume(doLogin(credentials));
    }

    private Response doLogin(Credentials credentials) {
        return Response.ok().entity("{\"token\":\"" + dao.login(credentials) + "\"}").build();
    }

    @GET
    @Authenticated
    @Asynchronous
    public void retoken(@Suspended final AsyncResponse asyncResponse) {
        asyncResponse.resume(doRetoken());
    }

    private Response doRetoken() {
        return Response.ok().entity("{\"token\":\"" + dao.retoken() + "\"}").build();
    }

//    @GET
//    @Path("publicKey")
//    public Response getPublicKey() {
//        return Response.ok().entity("{\"publicKey\":\"" + config.getPublicKey() + "\"}").build();
//    }

//    @POST
//    @Asynchronous
//    @Transactional
//    @Path("register")
//    public void registro(@Suspended final AsyncResponse asyncResponse, Credentials credentials) {
//        asyncResponse.resume(doRegistro(credentials));
//    }
//
//    private Response doRegistro(Credentials credentials) {
//        return Response.ok().entity("{\"mensage\":\"Código de validação: " + dao.registro(credentials) + "\"}").build();
//    }

//    @GET
//    @Asynchronous
//    @Transactional
//    @Path("valida/{id}")
//    public void valida(@Suspended final AsyncResponse asyncResponse, @PathParam("id") String id) {
//        asyncResponse.resume(doValida(id));
//    }
//
//    private Response doValida(String id) {
//        return Response.ok().entity("{\"token\":\"" + dao.valida(id) + "\"}").build();
//    }

}
