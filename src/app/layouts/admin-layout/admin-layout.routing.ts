import { Routes } from "@angular/router";

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


export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },

  { path: "projects", component: ProjectsComponent },
  { path: "namespaces/:projectId", component: NamespacesComponent },
  { path: "classes/:namespaceId", component: ClassesComponent },
  { path: "methods/:classId", component: MethodsComponent },
  { path: "tree/:methodId", component: TreeComponent },
  // { path: "rtl", component: RtlComponent }
];
