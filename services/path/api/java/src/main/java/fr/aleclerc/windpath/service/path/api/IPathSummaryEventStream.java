package fr.aleclerc.windpath.service.path.api;

import fr.aleclerc.windpath.service.path.api.projection.PathSummaryProjectionEvent;
import io.reactivex.Observable;
import io.smallrye.mutiny.Multi;

public interface IPathSummaryEventStream {

    Multi<PathSummaryProjectionEvent> getEventStream();
}
