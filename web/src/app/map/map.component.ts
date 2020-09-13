import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Path, Position, Bounds } from '../proto-gen/pathProjection_pb';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: L.Map;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    console.log('init');
    this.map = L.map('map', {
      center: [47.2173, -1.5534],
      zoom: 10
    });
    const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    esriWorldImagery.addTo(this.map);
  }

  public addPath(path: Path) {
    const group: L.LayerGroup = L.layerGroup();
    path.getSegmentsList().forEach(seg => {
      group.addLayer(L.polyline([this.convertToLatLng(seg.getPointa()), this.convertToLatLng(seg.getPointb())],
        { color: this.getColor(seg.getSpeed()) }));
    });
    group.addTo(this.map);
    if (path.getBounds() != null) {
      this.fitBounds(path.getBounds());
    }else{
      this.map.flyTo(this.convertToLatLng(path.getSegmentsList()[0].getPointa()), 15);
    }
  }

  private fitBounds(bounds: Bounds) {
    const b: L.LatLngBounds = L.latLngBounds(this.convertToLatLng(bounds.getCornera()), this.convertToLatLng(bounds.getCornerb()));
    this.map.flyToBounds(b);
  }

  private convertToLatLng(position: Position): L.LatLng {
    return new L.LatLng(position.getLat(), position.getLon());
  }

  private getColor(speed: number) {
    const moy = speed * 1.943844492;
    const value = moy / 30;
    const hue = ((1 - value) * 120).toString(10);
    return ['hsl(', hue, ',100%,50%)'].join('');
  }
}
