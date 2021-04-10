package fr.aleclerc.windpath.service.path.api;

import fr.aleclerc.windpath.service.path.api.common.ProtoUUID;
import fr.aleclerc.windpath.service.path.api.projection.Path;
import io.smallrye.mutiny.Uni;

public interface IPathService {

    Uni<Path> getPath(ProtoUUID id);
}
