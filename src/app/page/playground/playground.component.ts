import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // See https://en.wikipedia.org/wiki/Test_functions_for_optimization
    function goldsteinPrice(x, y) {
      return (1 + Math.pow(x + y + 1, 2) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * x + 3 * y * y))
        * (30 + Math.pow(2 * x - 3 * y, 2) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y));
    }

    const n = 256, m = 256, values = new Array(n * m);
    for (let j = 0.5, k = 0; j < m; ++j) {
      for (let i = 0.5; i < n; ++i, ++k) {
        values[k] = goldsteinPrice(i / n * 4 - 2, 1 - j / m * 3);
      }
    }

    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const i0 = d3.interpolateHslLong(d3.hsl(120, 1, 0.65), d3.hsl(60, 1, 0.90));
    const i1 = d3.interpolateHslLong(d3.hsl(60, 1, 0.90), d3.hsl(0, 0, 0.95));
    const interpolateTerrain = function(t) { return t < 0.5 ? i0(t * 2) : i1((t - 0.5) * 2); };
    const color = d3.scaleSequential(interpolateTerrain).domain([90, 190]);

    svg.selectAll("path").data(
      d3.contours()
        .size([n, m])
        .thresholds(d3.range(2, 21).map(p => Math.pow(2, p)))
        (values)
    )
      .enter()
      .append("path").attr("d", d3.geoPath(d3.geoIdentity().scale(width / n)))
      .attr("fill", function(d) { return color(d.value); });
  }

}
