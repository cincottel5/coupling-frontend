import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Neo4jService } from '../../services/neo4j.service';
import { queries } from '../../neo4j/queries';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../neo4j/models/Project';
import { RoutesService } from '../../services/routes.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  
  projects = [];
  loading = false;

  constructor( 
    private neo4jService: Neo4jService,
    private toastr: ToastrService,
    private router: Router,
    private routesService: RoutesService) { }

  ngOnInit() {
    this.loading = true;
    this.routesService.cleanFromProject();

    this.neo4jService
      .run(queries.get_projects)
      .then( result => {

        result.records.forEach(r => {
          this.projects.push(new Project(r));
        });

        this.loading = false;
      })
      .catch( e => {
        console.log(e);
        this.toastr.error('Ha ocurrido un error al extraer la información de la base de datos', 'Base de datos');
        this.loading = false;
      });
  }

  goToNamespaces(projectId) {
    this.routesService.project = {url: '/namespaces/'+projectId, label: projectId};

    this.router.navigate(['namespaces', projectId]);
  }
}
