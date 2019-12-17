import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { ProjectsComponent } from '../../coupling/projects/projects.component';
import { NamespacesComponent } from '../../coupling/namespaces/namespaces.component';
import { ClassesComponent } from '../../coupling/classes/classes.component';
import { MethodsComponent } from '../../coupling/methods/methods.component';
import { TreeComponent } from '../../coupling/tree/tree.component';

import { D3Service, D3_DIRECTIVES } from '../../neo4j/d3';
import { GraphComponent } from '../../neo4j/visuals/graph/graph.component';
import { SHARED_VISUALS } from '../../neo4j/visuals/shared';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import {NgxPaginationModule} from 'ngx-pagination'; 
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    ToastrModule,
    NgSelectModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    ProjectsComponent, 
    NamespacesComponent, 
    ClassesComponent, 
    MethodsComponent, 
    TreeComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
