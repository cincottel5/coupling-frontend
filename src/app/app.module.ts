import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import {NgxPaginationModule} from 'ngx-pagination'; 

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";

import { D3Service } from './neo4j/d3/d3.service';
import { Neo4jService } from './services/neo4j.service';
import { RoutesService } from './services/routes.service';
import { GraphNodeService } from './services/graph-node.service';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  declarations: [AppComponent, AdminLayoutComponent],
  providers: [
    D3Service, 
    Neo4jService,
    RoutesService,
    GraphNodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
