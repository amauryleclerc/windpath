package fr.aleclerc.windpath.service.path.handler;

import fr.aleclerc.windpath.service.path.api.IPathSummaryEventStream;
import fr.aleclerc.windpath.service.path.api.IPathSummaryService;
import fr.aleclerc.windpath.service.path.api.common.ProtoUUID;
import fr.aleclerc.windpath.service.path.api.projection.*;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;


@Singleton
public class PathSummaryEventStreamHandler extends MutinyPathSummaryProjectionGrpc.PathSummaryProjectionImplBase {

    private final static Logger LOGGER = LoggerFactory.getLogger(PathSummaryEventStreamHandler.class);
    @Inject
    IPathSummaryEventStream summaryEventStream;
    @Inject
    IPathSummaryService summaryService;

    @Override
    public Multi<PathSummaryProjectionEvent> getPathSummaryEventStream(PathSession request) {
        LOGGER.info("Request");
        return summaryEventStream.getEventStream();
    }

    @Override
    public Uni<PathSummary> getPathSummary(ProtoUUID request) {
        return summaryService.getSummary(request);
    }
}
