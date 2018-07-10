import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {rootRouter} from './app.router';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BorderMeshComponent } from './page/border-mesh/border-mesh.component';
import { ForceDirectedGraphComponent } from './page/force-directed-graph/force-directed-graph.component';
import { PlaygroundComponent } from './page/playground/playground.component';
import { ContourComponent } from './page/contour/contour.component';
import { RefreshableContourComponent } from './page/refreshable-contour/refreshable-contour.component';

@NgModule({
  declarations: [
    AppComponent,
    BorderMeshComponent,
    ForceDirectedGraphComponent,
    PlaygroundComponent,
    ContourComponent,
    RefreshableContourComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    rootRouter,

    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatTreeModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
