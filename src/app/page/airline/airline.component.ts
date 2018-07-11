import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {GeoPath, GeoProjection} from 'd3-geo';
import * as topojson from 'topojson';

const  OD_PAIRS = [
  ['NRT', 'JFK'],
  ['SFO', 'NRT'],
  ['LAX', 'HNL'],
  ['HNL', 'NRT'],
  ['CDG', 'JFK'],
  ['NRT', 'SYD'],
  ['FCO', 'PEK'],
  ['LHR', 'PVG'],
  ['NRT', 'ARN'],
  ['LAX', 'JFK'],
  ['NRT', 'DEL'],
  ['DFW', 'GRU'],
  ['MAD', 'ATL'],
  ['ORD', 'CAI'],
  ['HKG', 'CDG'],
  ['LAS', 'CDG'],
  ['NRT', 'SVO'],
  ['DEN', 'HNL'],
  ['ORD', 'LAX'],
  ['SIN', 'SEA'],
  ['SYD', 'PEK'],
  ['CAI', 'CPT'],
  ['CUN', 'JFK'],
  ['ORD', 'JFK'],
  ['LHR', 'BOM'],
  ['LAX', 'MEX'],
  ['LHR', 'CPT'],
  ['PVG', 'CGK'],
  ['SYD', 'BOM'],
  ['JFK', 'CPT'],
  ['MAD', 'GRU'],
  ['EZE', 'FCO'],
  ['DEL', 'DXB'],
  ['DXB', 'NRT'],
  ['GRU', 'MIA'],
  ['SVO', 'PEK'],
  ['YYZ', 'ARN'],
  ['LHR', 'YYC'],
  ['HNL', 'SEA'],
  ['JFK', 'EZE'],
  ['EZE', 'LAX'],
  ['CAI', 'HKG'],
  ['SVO', 'SIN'],
  ['IST', 'MCO'],
  ['MCO', 'LAX'],
  ['FRA', 'LAS'],
  ['ORD', 'FRA'],
  ['MAD', 'JFK']
];

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map') map: ElementRef;

  private airplaneSvgPath: string;

  private airportMap: any = {};

  private defaultW = 938;
  private defaultH = 620;
  private curW: number;

  private projection: GeoProjection;
  private path: GeoPath;
  private svg: any;

  private refreshInterval: any;

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.projection = d3.geoMercator()
      .scale(150)
      .translate([this.defaultW / 2, this.defaultH / 1.41]);

    this.path = d3.geoPath()
      .pointRadius(2)
      .projection(this.projection);

    this.svg = d3.select('svg')
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('viewBox', '0 0 ' + this.defaultW + ' ' + this.defaultH);
    this.onResize();

    Promise.all([
      d3.text('/assets/data/airplane.svg.txt'),
      d3.json('/assets/data/airports2.topo.json'),
      d3.json('/assets/data/countries2.topo.json')
    ]).then(res => {
      this.airplaneSvgPath = res[0];
      const airports: any = res[1];
      const countries: any = res[2];

      this.svg.append('g')
        .attr('class', 'countries')
        .selectAll('path')
        .data(topojson.feature(countries, countries.objects.countries)["features"])
        .enter()
        .append('path')
        .attr('d', this.path);

      this.svg.append('g')
        .attr('class', 'airports')
        .selectAll('path')
        .data(topojson.feature(airports, airports.objects.airports)["features"])
        .enter()
        .append('path')
        .attr('id', function(d) {return d.id;})
        .attr('d', this.path);

      const geos = topojson.feature(airports, airports.objects.airports)["features"];
      for (const key of Object.keys(geos)) {
        this.airportMap[geos[key].id] = geos[key].geometry.coordinates;
      }

      {
        let i = 0;
        this.refreshInterval = setInterval(() => {
          if (i > OD_PAIRS.length - 1) {
            i = 0;
          }
          const od = OD_PAIRS[i];
          this.fly(od[0], od[1]);
          i++;
        }, 150);
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.refreshInterval);
  }

  transition(plane, route) {
    const len = route.node().getTotalLength();
    plane.transition()
      .duration(len * 50)
      .attrTween('transform', this.delta(plane, route.node()))
      .on("end", () => route.remove())
      .remove();
  }

  delta(plane, path) {
    const len = path.getTotalLength();
    return i => {
      return t => {
        const p = path.getPointAtLength(t * len);

        const t2 = Math.min(t + 0.05, 1);
        const p2 = path.getPointAtLength(t2 * len);

        const x = p2.x - p.x;
        const y = p2.y - p.y;
        const r = 90 - Math.atan2(-y, x) * 180 / Math.PI;

        const s = Math.min(Math.sin(Math.PI * t) * 0.7, 0.3);

        return 'translate(' + p.x + ',' + p.y + ') scale(' + s + ') rotate(' + r + ')';
      };
    };
  }

  fly(origin, destination) {
    const route = this.svg.append('path')
      .datum({type: 'LineString', coordinates: [this.airportMap[origin], this.airportMap[destination]]})
      .attr('class', 'route')
      .attr('d', this.path);

    const plane = this.svg.append('path')
      .attr('class', 'plane')
      .attr('d', this.airplaneSvgPath);

    this.transition(plane, route);
  }

  @HostListener('window:resize')
  onResize() {
    this.curW = this.map.nativeElement.offsetWidth;
    this.svg
      .attr('width', this.curW)
      .attr('height', this.curW * this.defaultH / this.defaultW);
  }

}
