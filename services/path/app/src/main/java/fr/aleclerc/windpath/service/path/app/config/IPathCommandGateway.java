package fr.aleclerc.windpath.service.path.app.config;

import com.google.protobuf.Message;
import io.quarkus.runtime.annotations.RegisterForReflection;
import org.axonframework.commandhandling.gateway.Timeout;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@RegisterForReflection
public interface IPathCommandGateway {

    @Timeout(value = 10, unit = TimeUnit.SECONDS)
    CompletableFuture<String> sendCommand(Message command, Map<String, UUID> aggregateId);
}
