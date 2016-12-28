/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.service;

import app.entity.Usuario;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.transaction.Transactional;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import org.demoiselle.jee.persistence.crud.AbstractREST;
import org.demoiselle.jee.rest.annotation.ValidatePayload;
import org.demoiselle.jee.security.annotation.LoggedIn;
import org.demoiselle.jee.security.annotation.NotLogged;

/**
 *
 * @author gladson
 */
@Api("Usuario")
@Path("usuario")
public class UsuarioREST extends AbstractREST<Usuario, String> {

//    @POST
//    @Override
//    @Transactional
//    @NotLogged
//    @ValidatePayload
//    @ApiOperation(value = "persist entity")
//    public Usuario persist(Usuario entity) {
//        return bc.persist(entity);
//    }

}
