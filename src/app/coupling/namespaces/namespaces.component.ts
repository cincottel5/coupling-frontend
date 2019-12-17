import { Component, OnInit } from '@angular/core';
import { Neo4jService } from '../../services/neo4j.service';
import { queries } from '../../neo4j/queries';
import { ToastrService } from 'ngx-toastr';
import { Namespace } from '../../neo4j/models/Namespace';
import { ActivatedRoute, Router  } from '@angular/router';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-namespaces',
  templateUrl: './namespaces.component.html',
  styleUrls: ['./namespaces.component.scss']
})
export class NamespacesComponent implements OnInit {

  projectId;
  
  namespaces = [];
  loading = false;

  total;
  limit = 8;
  page = 1;

  constructor(private neo4jService: Neo4jService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private routesSservice: RoutesService) { }

  async ngOnInit() {
    this.routesSservice.cleanFromNamespaces();
    this.projectId = this.activatedRoute.snapshot.paramMap.get('projectId');

    await this.getTotal();
    await this.loadNamespaces();
  }

  async loadNamespaces(pageNumber = 1) {

    this.loading = true;
    this.namespaces = [];
    this.page = pageNumber;

    let query = queries.get_namespaces;
    query = query
      .replace('$(PROJECT_ID)', this.projectId)
      .replace('$(SKIP)', ((pageNumber-1)*this.limit).toString())
      .replace('$(LIMIT)', this.limit.toString());

    await this.neo4jService
      .run(query)
      .then( result => {

        result.records.forEach(r => {
          this.namespaces.push(new Namespace(r));
        });

        this.loading = false;
      })
      .catch( e => {
        console.log(e);
        this.toastr.error('Ha ocurrido un error al extraer la información de la base de datos', 'Base de datos');
        this.loading = false;
      });
  }

  async getTotal() {
    
    let query = queries.get_total_namespaces.replace('$(PROJECT_ID)', this.projectId);

    await this.neo4jService
      .run(query)
      .then( result => {

        result.records.forEach(r => {
          this.total = r.get('total').low;
        });

        
      })
      .catch( e => {
        console.log(e);
        this.toastr.error('Ha ocurrido un error al extraer el total', 'Base de datos');
        this.loading = false;
      });
  }

  goToClasses(id, name) {
    this.routesSservice.namespace = {url: '/classes/'+id, label: name};

    try {
      this.router.navigate(['classes', id]);
    } catch (e){ 
      console.log(e);
    }
    
  }

}
