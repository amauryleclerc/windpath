package fr.aleclerc.windpath.resource;

import org.axonframework.commandhandling.gateway.CommandGateway;

import javax.ws.rs.Path;

@Path("/command")
public class GpxResource {

    private final CommandGateway commandGateway;

    public GpxResource(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }
//
//    @POST
//    @Path("/create-from-gpx")
//    @Produces(MediaType.TEXT_PLAIN)
//    @Consumes(MediaType.APPLICATION_XML)
//    public String gpx(Gpx gpx) throws JAXBException {
//
//        return commandGateway.sendAndWait(new CreatePathFormGpxCommand(UUID.randomUUID().toString(), gpx));
//    }
//
//    @POST
//    @Path("/rename")
//    @Produces(MediaType.TEXT_PLAIN)
//    @Consumes(MediaType.APPLICATION_JSON)
//    public String rename(RenamePathCommand command) {
//        return commandGateway.sendAndWait(command);
//    }
}