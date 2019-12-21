import { Routes } from "@angular/router";

// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { ProjectsComponent } from '../../coupling/projects/projects.component';
import { NamespacesComponent } from '../../coupling/namespaces/namespaces.component';
import { ClassesComponent } from '../../coupling/classes/classes.component';
import { MethodsComponent } from '../../coupling/methods/methods.component';
import { TreeComponent } from '../../coupling/tree/tree.component';


export const AdminLayoutRoutes: Routes = [
  { path: "projects", component: ProjectsComponent },
  { path: "namespaces/:projectId", component: NamespacesComponent },
  { path: "classes/:namespaceId", component: ClassesComponent },
  { path: "methods/:classId", component: MethodsComponent },
  { path: "tree/:methodId", component: TreeComponent },
  // { path: "rtl", component: RtlComponent }
];
