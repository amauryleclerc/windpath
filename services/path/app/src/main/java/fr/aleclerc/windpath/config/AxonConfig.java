package fr.aleclerc.windpath.config;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import fr.aleclerc.windpath.service.path.domain.PathAggregate;
import io.quarkus.arc.DefaultBean;
import io.quarkus.runtime.Startup;
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
import java.security.GeneralSecurityException;
import java.util.Collections;

@Startup
@Dependent
public class AxonConfig {

    private final static Logger LOGGER = LoggerFactory.getLogger(AxonConfig.class);
    private final static String CLIENT_ID = "";
    private final Configuration config;

    public boolean verify(String idTokenString) throws GeneralSecurityException, IOException {
        GoogleIdToken idToken = tokenVerifier().verify(idTokenString);
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            // Print user identifier
            String userId = payload.getSubject();
            System.out.println("User ID: " + userId);
            // Get profile information from payload
            String email = payload.getEmail();
            boolean emailVerified = payload.getEmailVerified();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");
            String locale = (String) payload.get("locale");
            String familyName = (String) payload.get("family_name");
            String givenName = (String) payload.get("given_name");
        }
        return idToken != null;
    }


    public AxonConfig() {
        LOGGER.info("Init axon config");
        final Configurer configurer = DefaultConfigurer.defaultConfiguration()
                .configureSerializer(c -> new ProtoSerializer())
                //  .configureMessageSerializer(c -> new ProtoSerializer())
                .registerComponent(RoutingStrategy.class, c -> new ProtoRoutingStrategy())
                .configureAggregate(AggregateConfigurer.defaultConfiguration(PathAggregate.class)
                        .configureCommandTargetResolver(configuration -> new ProtoCommandTargetResolver()));
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
    public PathCommandGateway pathCommandGateway() {
        final CommandGatewayFactory factory = CommandGatewayFactory.builder()
                .commandBus(commandBus())
                .build();
        return factory.createGateway(PathCommandGateway.class);
    }

    @Singleton
    @Produces
    @DefaultBean
    public GoogleIdTokenVerifier tokenVerifier() {
        final HttpTransport httpTransport = new NetHttpTransport();
        final JacksonFactory jsonFactory = new JacksonFactory();
        return new GoogleIdTokenVerifier.Builder(httpTransport, jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();
    }
}
