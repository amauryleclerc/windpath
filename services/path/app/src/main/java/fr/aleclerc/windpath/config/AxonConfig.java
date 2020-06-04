package fr.aleclerc.windpath.config;

import fr.aleclerc.windpath.service.path.domain.PathAggregate;
import io.quarkus.arc.DefaultBean;
import org.axonframework.commandhandling.CommandBus;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.config.Configuration;
import org.axonframework.config.Configurer;
import org.axonframework.config.DefaultConfigurer;
import org.axonframework.serialization.json.JacksonSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;

@Dependent
public class AxonConfig {

    private final static Logger LOGGER = LoggerFactory.getLogger(AxonConfig.class);
    private final Configuration config;


    public AxonConfig() {
        LOGGER.info("Init axon config");
        final Configurer configurer = DefaultConfigurer.defaultConfiguration()
                .configureSerializer(c -> JacksonSerializer.defaultSerializer())
                .configureAggregate(PathAggregate.class);
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
}
