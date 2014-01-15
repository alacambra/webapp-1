package poolingpeople.webapplication.business.user.boundary;

import java.io.IOException;
import java.util.Set;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import poolingpeople.webapplication.business.boundary.CatchWebAppException;
import poolingpeople.webapplication.business.boundary.SetMixinView;
import poolingpeople.webapplication.business.entity.DTOConverter;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.neo4j.Neo4jTransaction;
import poolingpeople.webapplication.business.user.entity.User;

@Path("users")
@Stateless
@Neo4jTransaction
@CatchWebAppException
public class UserBoundary {

    @Inject
    @SetMixinView(entity = User.class, mixin = UserMixin.class)
    ObjectMapper mapper;

    @Inject
    EntityFactory entityFactory;

    @Inject
    DTOConverter dtoConverter;

    @Inject
    Validator validator;

    @GET
    @Path("{id:[\\w\\d-]+}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserById(@PathParam("id") String id)
            throws JsonGenerationException, JsonMappingException, IOException {
        String r = mapper.writerWithView(UserMixin.class).writeValueAsString(
                entityFactory.getUserById(id));
        return Response.ok().entity(r).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() throws JsonGenerationException,
            JsonMappingException, IOException {
        String r = mapper.writeValueAsString(entityFactory.getAllUsers());
        return Response.ok().entity(r).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveUser(String json) throws JsonParseException,
            JsonMappingException, IOException {
        User dtoUser = mapper.readValue(json, UserDTO.class);
        
        StringBuilder sb = new StringBuilder();
        
        Set<ConstraintViolation<User>> violations = validator.validate(dtoUser);
        
        if (violations.size() > 0) {
            for (ConstraintViolation<User> constraintViolation : violations) {
                System.out.println(constraintViolation.getPropertyPath() + " " + constraintViolation.getMessage());
                sb.append(constraintViolation.getMessage());
            }
            return Response.status(Status.BAD_REQUEST).entity(sb.toString()).build();

        } else {
            User user = dtoConverter.fromDTOtoPersitedBean(dtoUser, entityFactory.createUser(dtoUser.getEmail(), dtoUser.getPassword()));
            return Response.ok().entity(mapper.writeValueAsString(user)).build();
        }
    }

    @PUT
    @Path("{id:[\\w\\d-]+}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(@PathParam("id") String uuid, String json)
            throws JsonParseException, JsonMappingException, IOException {
        User dtoUser = mapper.readValue(json, UserDTO.class);
        StringBuilder sb = new StringBuilder();
        Set<ConstraintViolation<User>> violations = validator.validate(dtoUser);
        if (violations.size() > 0) {
            for (ConstraintViolation<User> constraintViolation : violations) {
                System.out.println(constraintViolation.getPropertyPath() + " " + constraintViolation.getMessage());
                sb.append(constraintViolation.getMessage());
            }
            return Response.serverError().entity(sb.toString()).build();
        } else {
            User user = dtoConverter.fromDTOtoPersitedBean(dtoUser,
                    entityFactory.getUserById(uuid));
            String r = mapper.writeValueAsString(user);
            return Response.ok().entity(r).build();
        }
    }

    @DELETE
    @Path("{id:[\\w\\d-]+}")
    public Response deleteUser(@PathParam("id") String uuid) {
        entityFactory.deleteUser(uuid);
        return Response.ok().build();
    }
    
    @GET
    @Path("fakeit")
    @Produces(MediaType.APPLICATION_JSON)
    public Response fakeUser() throws JsonGenerationException, JsonMappingException, IOException {

        User persistedUser = entityFactory.createUser("al@al.com", "a");

        persistedUser.setEmail("al@al.com");
        persistedUser.setFirstName("al");
        persistedUser.setPassword("abc");
        persistedUser.setLastName("ipsum");

        String r = mapper.writeValueAsString(persistedUser);
        return Response.ok().entity(r).build();
    }
}
