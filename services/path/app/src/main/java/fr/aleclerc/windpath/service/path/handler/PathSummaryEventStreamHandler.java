package fr.aleclerc.windpath.service.path.handler;

import fr.aleclerc.windpath.service.path.api.IPathSummaryEventStream;
import fr.aleclerc.windpath.service.path.api.projection.*;
import io.grpc.stub.StreamObserver;
import io.smallrye.mutiny.Multi;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;


@Singleton
public class PathSummaryEventStreamHandler extends MutinyPathProjectionGrpc.PathProjectionImplBase {

    private final static Logger LOGGER = LoggerFactory.getLogger(PathCommandHandler.class);
    @Inject
    IPathSummaryEventStream summaryEventStream;

    @Override
    public Multi<PathSummaryProjectionEvent> getPathSummaryEventStream(PathSession request) {
        LOGGER.info("Request");
       return summaryEventStream.getEventStream();

//        return summaryEventStream.getEventStream()
//                                .map(v-> {
//                    LOGGER.info("Mutiny : {}",v);
//                    return v;
//                });

 //       return Multi.createFrom().item(PathSummaryProjectionEvent.newBuilder().setPathCreatedEvent(PathCreatedEvent.newBuilder().setPath(PathSummary.newBuilder().setName("TOTO"))).build());
//        return Multi.createFrom().converter(MultiRxConverters.fromObservable(), summaryEventStream.getEventStream()
//                .doOnNext(v -> LOGGER.info("Event : {}",v)))
//                .map(v-> {
//                    LOGGER.info("Mutiny : {}",v);
//                    return v;
//                });
    }
}
