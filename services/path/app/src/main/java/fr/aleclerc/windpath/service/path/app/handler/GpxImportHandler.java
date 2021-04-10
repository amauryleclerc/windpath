package fr.aleclerc.windpath.service.path.app.handler;

import com.google.common.collect.Maps;
import com.google.protobuf.Message;
import com.google.protobuf.Timestamp;
import com.google.protobuf.util.Timestamps;
import com.topografix.gpx._1._0.BoundsType;
import com.topografix.gpx._1._0.Gpx;
import fr.aleclerc.windpath.service.path.api.common.GenericResponse;
import fr.aleclerc.windpath.service.path.api.domain.CreatePathFromGpxCommand;
import fr.aleclerc.windpath.service.path.api.gpx.*;
import fr.aleclerc.windpath.service.path.app.config.IPathCommandGateway;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import org.axonframework.commandhandling.CommandBus;
import org.axonframework.commandhandling.CommandMessage;
import org.axonframework.commandhandling.GenericCommandMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.datatype.XMLGregorianCalendar;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Singleton
public class GpxImportHandler extends MutinyGpxImportServiceGrpc.GpxImportServiceImplBase {

    private final static Logger LOGGER = LoggerFactory.getLogger(GpxImportHandler.class);
    @Inject
    IPathCommandGateway gateway;

    @Inject
    CommandBus bus;


    @Override
    public Uni<GenericResponse> importGpx(GpxXmlWrapper request) {
        return Uni.createFrom().optional(() -> createGpx(request))
                .toMulti().flatMap(v -> Multi.createFrom().iterable(this.createCommands(v)))
                .flatMap(v -> send(v, UUID.randomUUID()).toMulti())
                .collectItems().asList()
                .map(message -> {
                    final GenericResponse.Builder builder = GenericResponse.newBuilder().setSuccess(true);
                    if (message != null) {
                        builder.setMessage(String.join(",", message));
                    }
                    return builder.build();
                })
                .onFailure()
                .invoke(e -> LOGGER.error("Erreur sur l'import d'un GPX ", e))
                .onFailure()
                .recoverWithItem(e -> GenericResponse.newBuilder()
                        .setSuccess(false)
                        .setMessage(e.getMessage())
                        .build());
    }

    private Uni<String> send(Message command, UUID agg) {
        return Uni.createFrom().emitter(uniEmitter -> {
            bus.dispatch(GenericCommandMessage.asCommandMessage(command).andMetaData(Map.of("id", agg)), (m, r) -> {
                if(r.isExceptional()){
                    uniEmitter.fail(r.exceptionResult());
                }else{
                    uniEmitter.complete(r.getIdentifier());
                }
            });
        });
    }

    private Map<String, UUID> createMap() {
        HashMap<String, UUID> map = new HashMap<>();
        map.put("id", UUID.randomUUID());
        return map;
    }

    private List<CreatePathFromGpxCommand> createCommands(Gpx gpx) {
        final fr.aleclerc.windpath.service.path.api.gpx.Gpx gpxProto = convert(gpx);
        return gpxProto.getTracksList().stream().map(t -> createCommand(gpxProto, t)).collect(Collectors.toList());
    }

    private CreatePathFromGpxCommand createCommand(fr.aleclerc.windpath.service.path.api.gpx.Gpx gpx, Track track) {
        final CreatePathFromGpxCommand.Builder builder = CreatePathFromGpxCommand.newBuilder()
                .setTrack(track);
        if (gpx.hasTime()) {
            builder.setTime(gpx.getTime());
        }
        if (gpx.hasBounds()) {
            builder.setBounds(gpx.getBounds());
        }
        return builder.build();
    }


    private Optional<Gpx> createGpx(GpxXmlWrapper wrapper) {
        try {
            final JAXBContext jc = JAXBContext.newInstance(Gpx.class);
            final Unmarshaller unmarshaller = jc.createUnmarshaller();
            return Optional.of((Gpx) unmarshaller.unmarshal(wrapper.getGpx().newInput()));
        } catch (JAXBException e) {
            return Optional.empty();
        }
    }

    private fr.aleclerc.windpath.service.path.api.gpx.Gpx convert(Gpx gpx) {
        fr.aleclerc.windpath.service.path.api.gpx.Gpx.Builder gpxBuilder = fr.aleclerc.windpath.service.path.api.gpx.Gpx.newBuilder();
        if (gpx.getBounds() != null) {
            gpxBuilder.setBounds(convert(gpx.getBounds()));
        }
        gpx.getTrk().forEach(t -> gpxBuilder.addTracks(convert(t)));
        if (gpx.getTime() != null) {
            gpxBuilder.setTime(convert(gpx.getTime()));
        } else {
            if (gpxBuilder.getTracksCount() > 0) {
                Track t = gpxBuilder.getTracks(0);
                if (t.getSegmentsCount() > 0) {
                    Segment s = t.getSegments(0);
                    if (s.getPointsCount() > 0) {
                        gpxBuilder.setTime(s.getPoints(0).getTime());
                    }
                }
            }
        }
        return gpxBuilder.build();
    }

    private Track convert(Gpx.Trk t) {
        Track.Builder builder = Track.newBuilder();
        builder.setName(t.getName());
        t.getTrkseg().forEach(s -> builder.addSegments(convert(s)));
        return builder.build();
    }

    private Segment convert(Gpx.Trk.Trkseg s) {
        Segment.Builder builder = Segment.newBuilder();
        s.getTrkpt().forEach(p -> builder.addPoints(convert(p)));
        return builder.build();
    }

    private Point convert(Gpx.Trk.Trkseg.Trkpt p) {
        Point.Builder builder = Point.newBuilder();
        builder.setLat(p.getLat().doubleValue());
        builder.setLon(p.getLon().doubleValue());
        builder.setEle(p.getEle().doubleValue());
        builder.setTime(convert(p.getTime()));
        if (p.getSpeed() != null) {
            builder.setSpeed(p.getSpeed().doubleValue());
        } else {
            builder.setSpeed(0);
        }
        return builder.build();
    }

    private Timestamp convert(XMLGregorianCalendar calendar) {
        return Timestamps.fromMillis(calendar.toGregorianCalendar().getTimeInMillis());
    }

    private Bounds convert(BoundsType boundsType) {
        Bounds.Builder builder = Bounds.newBuilder();
        builder.setMinlat(boundsType.getMinlat().doubleValue());
        builder.setMinlon(boundsType.getMinlon().doubleValue());
        builder.setMaxlat(boundsType.getMaxlat().doubleValue());
        builder.setMaxlon(boundsType.getMaxlon().doubleValue());
        return builder.build();
    }
}
