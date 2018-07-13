import {RouterModule} from '@angular/router';
import {BorderMeshComponent} from './page/border-mesh/border-mesh.component';
import {ForceDirectedGraphComponent} from './page/force-directed-graph/force-directed-graph.component';
import {PlaygroundComponent} from './page/playground/playground.component';
import {ContourComponent} from './page/contour/contour.component';
import {RefreshableContourComponent} from './page/refreshable-contour/refreshable-contour.component';
import {AirlineComponent} from './page/airline/airline.component';

export const demos = [
  // {
  //   label: "Playground",
  //   path: "playground",
  //   component: PlaygroundComponent
  // },
  // {
  //   label: "Border Mesh",
  //   path: "borderMesh",
  //   component: BorderMeshComponent
  // },
  // {
  //   label: "Force-Directed Graph",
  //   path: "forceDirectedGraph",
  //   component: ForceDirectedGraphComponent
  // },
  // {
  //   label: "Contour",
  //   path: "contour",
  //   component: ContourComponent
  // },
  {
    label: "Refreshable Contour",
    path: "refreshableContour",
    component: RefreshableContourComponent
  },
  {
    label: "Airline",
    path: "airline",
    component: AirlineComponent
  },
];

export const rootRouter = RouterModule.forRoot(demos);
