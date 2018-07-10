import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-refreshable-contour',
  templateUrl: './refreshable-contour.component.html',
  styleUrls: ['./refreshable-contour.component.css']
})
export class RefreshableContourComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const svg = d3.select("svg");
    const width = +svg.attr("width");

    const i0 = d3.interpolateHslLong(d3.hsl(120, 1, 0.9), d3.hsl(60, 1, 0.7));
    const i1 = d3.interpolateHslLong(d3.hsl(60, 1, 0.7), d3.hsl(0, 1, 0.5));
    const interpolateTerrain = t => t < 0.5 ? i0(t * 2) : i1((t - 0.5) * 2);
    const color = d3.scaleSequential(interpolateTerrain).domain([90, 190]);

    d3.json("/assets/data/volcano.json").then((data: any) => {
      let values = data.values;
      // @TODO 利用transcation做渐变效果
      const refresh = (refreshData: boolean = true) => {
        if (refreshData) values = values.map(d => d + parseInt("" + ((1 - Math.random() * 2) * 2), 10));
        svg.selectAll("path").exit().remove()
          .data(
            d3.contours()
              .size([data.width, data.height])
              .thresholds(d3.range(90, 195, 8))
              (values)
          )
          .enter()
          .append("path").attr("d", d3.geoPath(d3.geoIdentity().scale(width / data.width)))
          .attr("fill", d => color(d.value));
      };
      setInterval(refresh, 1000);
      refresh(false);
    });
  }

}
