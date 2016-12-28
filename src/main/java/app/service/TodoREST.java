/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.service;

import app.entity.Todo;
import io.swagger.annotations.Api;
import javax.ws.rs.Path;
import org.demoiselle.jee.persistence.crud.AbstractREST;
import org.demoiselle.jee.security.annotation.LoggedIn;

/**
 *
 * @author gladson
 */
@LoggedIn
@Api("Todo")
@Path("todo")
public class TodoREST extends AbstractREST<Todo, String> {

}
