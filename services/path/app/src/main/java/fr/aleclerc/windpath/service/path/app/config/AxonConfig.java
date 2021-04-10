package fr.aleclerc.windpath.service.path.app.config;

import com.google.protobuf.Parser;
import fr.aleclerc.windpath.service.path.api.IPathService;
import fr.aleclerc.windpath.service.path.api.IPathSummaryEventStream;
import fr.aleclerc.windpath.service.path.api.IPathSummaryService;
import fr.aleclerc.windpath.service.path.api.domain.*;
import fr.aleclerc.windpath.service.path.app.domain.PathAggregate;
import fr.aleclerc.windpath.service.path.app.projection.PathProjection;
import fr.aleclerc.windpath.service.path.app.projection.PathSummaryProjection;
import io.quarkus.arc.DefaultBean;
import io.quarkus.runtime.Startup;
import org.axonframework.axonserver.connector.AxonServerConfiguration;
import org.axonframework.axonserver.connector.ServerConnectorConfigurerModule;
import org.axonframework.commandhandling.CommandBus;
import org.axonframework.commandhandling.distributed.RoutingStrategy;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.commandhandling.gateway.CommandGatewayFactory;
import org.axonframework.config.AggregateConfigurer;
import org.axonframework.config.Configuration;
import org.axonframework.config.Configurer;
import org.axonframework.config.DefaultConfigurer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;
import javax.inject.Singleton;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Startup
@Singleton
public class AxonConfig {

    private final static Logger LOGGER = LoggerFactory.getLogger(AxonConfig.class);
    private final static String CLIENT_ID = "";
    private final Configuration config;
    private final PathSummaryProjection pathSummaryProjection;
    private final PathProjection pathProjection;

//    public boolean verify(String idTokenString) throws GeneralSecurityException, IOException {
//        GoogleIdToken idToken = tokenVerifier().verify(idTokenString);
//        if (idToken != null) {
//            GoogleIdToken.Payload payload = idToken.getPayload();
//            // Print user identifier
//            String userId = payload.getSubject();
//            System.out.println("User ID: " + userId);
//            // Get profile information from payload
//            String email = payload.getEmail();
//            boolean emailVerified = payload.getEmailVerified();
//            String name = (String) payload.get("name");
//            String pictureUrl = (String) payload.get("picture");
//            String locale = (String) payload.get("locale");
//            String familyName = (String) payload.get("family_name");
//            String givenName = (String) payload.get("given_name");
//        }
//        return idToken != null;
//    }
//

    public AxonConfig() throws IOException {
        LOGGER.info("Init axon config");
        Map<Class<?>, Parser<?>> parsers = new HashMap<>();
        parsers.put(CreatePathFromGpxCommand.class, CreatePathFromGpxCommand.parser());
        parsers.put(RenamePathCommand.class, RenamePathCommand.parser());
        parsers.put(RemovePathCommand.class, RemovePathCommand.parser());
        parsers.put(PathCreatedFromGpxEvent.class, PathCreatedFromGpxEvent.parser());
        parsers.put(PathRenamedEvent.class, PathRenamedEvent.parser());
        this.pathSummaryProjection = new PathSummaryProjection();
        this.pathProjection = new PathProjection();
        final Configurer configurer = DefaultConfigurer.defaultConfiguration(false)
                .configureSerializer(c -> new ProtoSerializer(parsers))
                //  .configureMessageSerializer(c -> new ProtoSerializer())
                .registerComponent(RoutingStrategy.class, c -> new ProtoRoutingStrategy())
                .configureAggregate(AggregateConfigurer.defaultConfiguration(PathAggregate.class)
                        .configureCommandTargetResolver(configuration -> new ProtoCommandTargetResolver()))
                .eventProcessing(eventProcessingConfigurer ->
                        eventProcessingConfigurer.registerEventHandler(conf -> pathSummaryProjection)
                                .registerEventHandler(conf -> pathProjection));
        ServerConnectorConfigurerModule connectorConfigurerModule  = new ServerConnectorConfigurerModule();
        connectorConfigurerModule.configureModule(configurer);
        configurer.registerComponent(AxonServerConfiguration.class, c ->{
            AxonServerConfiguration axonServerConfig = new AxonServerConfiguration();
            axonServerConfig.setServers("localhost");
            return axonServerConfig;
        });

        this.config = configurer.start();

    }



    @Produces
    @DefaultBean
    public CommandBus commandBus() {
        return config.commandBus();
    }

    @Produces
    @DefaultBean
    public CommandGateway configuration() {
        return config.commandGateway();
    }

    @Produces
    @DefaultBean
    public IPathSummaryEventStream pathSummaryEventStream() {
        return pathSummaryProjection;
    }

    @Produces
    @DefaultBean
    public IPathSummaryService pathSummaryService() {
        return pathSummaryProjection;
    }

    @Produces
    @DefaultBean
    public IPathService pathService() {
        return pathProjection;
    }

    @Produces
    @DefaultBean
    public IPathCommandGateway pathCommandGateway() {
        final CommandGatewayFactory factory = CommandGatewayFactory.builder()
                .commandBus(commandBus())
                .build();
        return factory.createGateway(IPathCommandGateway.class);
    }

//    @Singleton
//    @Produces
//    @DefaultBean
//    public GoogleIdTokenVerifier tokenVerifier() {
//        final HttpTransport httpTransport = new NetHttpTransport();
//        final JacksonFactory jsonFactory = new JacksonFactory();
//        return new GoogleIdTokenVerifier.Builder(httpTransport, jsonFactory)
//                .setAudience(Collections.singletonList(CLIENT_ID))
//                .build();
//    }
}
