import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-border-mesh',
  templateUrl: './border-mesh.component.html',
  styleUrls: ['./border-mesh.component.css']
})
export class BorderMeshComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const svg = d3.select("svg");

    const path = d3.geoPath();

    d3.json("assets/data/us-10m.v1.json").then((us: any) => {
      svg.append("g")
        .attr("fill", "#b2b2b2")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states)["features"])
        .enter().append("path")
        .attr("d", path)
        .append("title")
        .text(d => (d as any).id);

      svg.append("path")
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

      svg.append("path")
        .attr("stroke", "#00adff")
        .attr("stroke-width", 1.5)
        .attr("d", path(topojson.mesh(us, us.objects.states, (obj1, obj2: any) => {
          const id1 = obj1.id;
          const id2 = obj2.id;
          if (id1 === "06" || id2 === "06") {
            return ["04", "32", "41"].indexOf(id1 !== "06" ? id1 : id2) > -1;
          }
          return false;
        })));
    });
  }

}
