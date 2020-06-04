package fr.aleclerc.windpath.resource;

import com.topografix.gpx._1._0.Gpx;
import fr.aleclerc.windpath.service.path.api.commands.CreatePathFormGpxCommand;
import fr.aleclerc.windpath.service.path.api.commands.RenamePathCommand;
import org.axonframework.commandhandling.gateway.CommandGateway;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.JAXBException;
import java.util.UUID;

@Path("/command")
public class GpxResource {

    private final CommandGateway commandGateway;

    public GpxResource(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @POST
    @Path("/create-from-gpx")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_XML)
    public String gpx(Gpx gpx) throws JAXBException {

        return commandGateway.sendAndWait(new CreatePathFormGpxCommand(UUID.randomUUID().toString(), gpx));
    }

    @POST
    @Path("/rename")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public String rename(RenamePathCommand command) {
        return commandGateway.sendAndWait(command);
    }
}