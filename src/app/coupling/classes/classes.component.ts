import { Component, OnInit } from '@angular/core';
import { Neo4jService } from '../../services/neo4j.service';
import { queries } from '../../neo4j/queries';
import { ToastrService } from 'ngx-toastr';
import { Class } from '../../neo4j/models/Class';
import { ActivatedRoute, Router  } from '@angular/router';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  namespaceId;
  
  classes = [];
  loading = false;

  total;
  limit = 8;
  page = 1;

  constructor(
    private neo4jService: Neo4jService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private routesService: RoutesService) { }

  async ngOnInit() {
    this.routesService.cleanFromClasses();
    this.namespaceId = this.activatedRoute.snapshot.paramMap.get('namespaceId');

    await this.getTotal();
    await this.loadClasses();
  }

  async loadClasses(pageNumber = 1) {
    
    this.loading = true;
    this.classes = [];
    this.page = pageNumber;

    let query = queries.get_classes;
    query = query
      .replace('$(NAMESPACE_ID)', this.namespaceId)
      .replace('$(SKIP)', ((pageNumber-1)*this.limit).toString())
      .replace('$(LIMIT)', this.limit.toString());

    await this.neo4jService
      .run(query)
      .then( result => {

        result.records.forEach(r => {
          this.classes.push(new Class(r));
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
    
    let query = queries.get_total_classes.replace('$(NAMESPACE_ID)', this.namespaceId);

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

  goToMethods(id, name) {
    this.routesService.class = {url: '/methods/'+id, label: name};
    try {
      this.router.navigate(['methods', id]);
    } catch (e){ 
      console.log(e);
    }
    
  }

}
