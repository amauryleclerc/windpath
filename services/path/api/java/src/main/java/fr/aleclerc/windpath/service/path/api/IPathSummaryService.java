package fr.aleclerc.windpath.service.path.api;

import fr.aleclerc.windpath.service.path.api.common.ProtoUUID;
import fr.aleclerc.windpath.service.path.api.projection.PathSummary;
import fr.aleclerc.windpath.service.path.api.projection.PathSummaryProjectionEvent;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;

public interface IPathSummaryService {

    Uni<PathSummary> getSummary(ProtoUUID id);
}
