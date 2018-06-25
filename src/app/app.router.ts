import {RouterModule} from '@angular/router';
import {BorderMeshComponent} from './page/border-mesh/border-mesh.component';
import {ForceDirectedGraphComponent} from './page/force-directed-graph/force-directed-graph.component';

export const demos = [
  {
    label: "Border Mesh",
    path: "borderMesh",
    component: BorderMeshComponent
  },
  {
    label: "Force-Directed Graph",
    path: "forceDirectedGraph",
    component: ForceDirectedGraphComponent
  }
];

export const rootRouter = RouterModule.forRoot(demos);
