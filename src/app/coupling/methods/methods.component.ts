import { Component, OnInit } from '@angular/core';
import { Neo4jService } from '../../services/neo4j.service';
import { queries } from '../../neo4j/queries';
import { ToastrService } from 'ngx-toastr';
import { Method } from '../../neo4j/models/Method';
import { ActivatedRoute, Router  } from '@angular/router';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss']
})
export class MethodsComponent implements OnInit {

  classId;
  
  methods = [];
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
    this.routesService.cleanFromMethods();
    this.classId = this.activatedRoute.snapshot.paramMap.get('classId');

    await this.getTotal();
    await this.loadMethods();
  }

  async loadMethods(pageNumber = 1) {
    
    this.loading = true;
    this.methods = [];
    this.page = pageNumber;

    let query = queries.get_methods;
    query = query
      .replace('$(CLASS_ID)', this.classId)
      .replace('$(SKIP)', ((pageNumber-1)*this.limit).toString())
      .replace('$(LIMIT)', this.limit.toString());

    await this.neo4jService
      .run(query)
      .then( result => {

        result.records.forEach(r => {
          this.methods.push(new Method(r));
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
    
    let query = queries.get_total_methods.replace('$(CLASS_ID)', this.classId);

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

  goToTree(id, name) {
    this.routesService.method = {url: '/tree/'+id, label: name};
    try {
      this.router.navigate(['tree', id]);
    } catch (e){ 
      console.log(e);
    }
  }

}
