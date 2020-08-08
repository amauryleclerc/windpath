package fr.aleclerc.windpath.service.path.handler;

import com.google.protobuf.Timestamp;
import com.google.protobuf.util.Timestamps;
import com.topografix.gpx._1._0.BoundsType;
import com.topografix.gpx._1._0.Gpx;
import fr.aleclerc.windpath.service.path.api.CreatePathFromGpxCommand;
import fr.aleclerc.windpath.service.path.api.GenericResponse;
import fr.aleclerc.windpath.service.path.api.gpx.*;
import fr.aleclerc.windpath.service.path.config.PathCommandGateway;
import io.smallrye.mutiny.Uni;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.datatype.XMLGregorianCalendar;
import java.util.Optional;
import java.util.UUID;

@Singleton
public class GpxImportHandler extends MutinyGpxImportServiceGrpc.GpxImportServiceImplBase {

    @Inject
    PathCommandGateway gateway;

    @Override
    public Uni<GenericResponse> importGpx(GpxXmlWrapper request) {
        UUID id = UUID.randomUUID();
        return Uni.createFrom().optional(() -> createGpx(request))
                .map(this::createCommand)
                .flatMap(v -> Uni.createFrom().completionStage(gateway.sendCommand(v, id)))
                .map(message -> {
                    final GenericResponse.Builder builder = GenericResponse.newBuilder().setSuccess(true);
                    if (message != null) {
                        builder.setMessage(message);
                    }
                    return builder.build();
                });
    }

    private CreatePathFromGpxCommand createCommand(Gpx gpx) {
        return CreatePathFromGpxCommand.newBuilder()
                .setGpx(convert(gpx))
                .build();
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
        gpxBuilder.setTime(convert(gpx.getTime()));
        gpxBuilder.setBounds(convert(gpx.getBounds()));
        gpx.getTrk().forEach(t -> gpxBuilder.addTracks(convert(t)));
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
