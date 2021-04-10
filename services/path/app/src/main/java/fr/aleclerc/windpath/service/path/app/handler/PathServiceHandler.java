package fr.aleclerc.windpath.service.path.app.handler;

import fr.aleclerc.windpath.service.path.api.IPathService;
import fr.aleclerc.windpath.service.path.api.common.ProtoUUID;
import fr.aleclerc.windpath.service.path.api.projection.MutinyPathProjectionGrpc;
import fr.aleclerc.windpath.service.path.api.projection.Path;
import io.smallrye.mutiny.Uni;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;


@Singleton
public class PathServiceHandler extends MutinyPathProjectionGrpc.PathProjectionImplBase {

    private final static Logger LOGGER = LoggerFactory.getLogger(PathServiceHandler.class);

    @Inject
    IPathService pathService;

    @Override
    public Uni<Path> getPath(ProtoUUID request) {
        return pathService.getPath(request);
    }
}
