import { Component, OnInit, ViewChild } from '@angular/core';
import APP_CONFIG from '../../app.config';
import { Node, Link } from '../../neo4j/d3';
import { Neo4jService } from '../../services/neo4j.service';
import { queries } from '../../neo4j/queries';
import { ActivatedRoute, Router  } from '@angular/router';
import { Options } from 'ng5-slider';
import { FormControl } from '@angular/forms';
import { GraphComponent } from '../../neo4j/visuals/graph/graph.component';
import { GraphNodeService} from '../../services/graph-node.service'; 
import { RoutesService } from '../../services/routes.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  nodes: Node[];
  links: Link[];

  classes = new Set();
  classNames = new Set();

  loaded = false;
  loading = false;

  methodId;
  methods = [];


  @ViewChild('graph', {static: false})
  graph: GraphComponent;

  searchSubscription;

  deepNumber: number = 2;
  relationshipType;

  searchControl = new FormControl();

  selectedNode;

  relationshipTypes = [
    { value: 0, label: 'Ambos' },
    { value: 1, label: 'Relaciones de entrada' },
    { value: 2, label: 'Relaciones de salida' }
  ]

  options: Options = {
    floor: 1,
    ceil: 10
  };

  closeResult: string;

  showTable = false;

  constructor(
    private neo4jService: Neo4jService,
    private activatedRoute: ActivatedRoute,
    private graphNodeService: GraphNodeService,
    private routesService: RoutesService,
    private modalService: NgbModal ) { }

    ngOnInit() {
      this.graphNodeService.node = null;
      this.routesService.cleanFromTree();
      this.methodId = this.activatedRoute.snapshot.paramMap.get('methodId');
  
      this.relationshipType = this.relationshipTypes[0].value;
  
      //console.log(this.methodId);
      this.getStructuralCoupling();
  
      this.setSearchSubscription() 
  
      this.graphNodeService.emitter.subscribe( node=> {
        this.selectedNode = node;

        // this.nodes.forEach(function(n){
        //   n.inCoEvolution = false;
        // });

        this.nodes.forEach(function(n) {
          let coEvolve = _.findIndex(n.coEvolutions, function(c) {
            return c.id.low == node.classId
          });

          n.inCoEvolution = (coEvolve != -1);
        });

        //console.log(this.nodes);
      })
    }
  
    getStructuralCoupling() {
      this.nodes = [];
      this.links = [];
  
      let query = "";
  
      //console.log(`tipo de relacion: ${this.relationshipType}`);
      switch(this.relationshipType) {
        case 0: 
  
          query = [queries.treeOut, queries.treeIn].join(" union ");
          break;
        case 1: 
          query = queries.treeIn;
          break;
        case 2:
          query = queries.treeOut;
          break;
      }
  
      query = query
        .replace(/\$\(METHOD_ID\)/g, this.methodId)
        .replace(/\$\(DEEP_NUMBER\)/g, (this.deepNumber-1).toString());
  
      this.neo4jService.run(query).then(results => {
        
  
        var nodes = [], rels = [], i = 0;
      
        results.records.forEach(res => {
  
          let base = new Node({
            id: res.get('id'),
            label: 'Class',
            method: res.get('method'),
          });
  
          let baseIndex = _.findIndex(nodes, ['id', base.id]);
  
          if (baseIndex == -1) {
            nodes.push(base);
            baseIndex = i;
            i++
          } else {
            nodes[baseIndex].method = base.method;
          }
  
          let relationships = new Set(res.get('rels'));
  
          relationships.forEach(id => {
            var relNode = new Node({
              id: id,
              label: 'Class',
              method: 'no-name'
            });
  
            var relIndex = _.findIndex(nodes, ['id', relNode.id]);
  
            if (relIndex == -1) {
              nodes.push(relNode);
              relIndex = i;
              i++;
            } else {
              relNode = nodes[relIndex];
            }
  
            if (res.get('type') == 'call') {
              rels.push(new Link(nodes[baseIndex], nodes[relIndex]))
            } else {
              rels.push(new Link(nodes[relIndex], nodes[baseIndex]))
            }
          })
        });
  
        this.nodes = nodes;
        this.links = rels;
        this.loaded = true;
  
        this.getLogicalCoupling();
      })
        .catch(e => {
          console.log(e);
        });
    }
  
    getLogicalCoupling() {
      if (this.nodes.length < 1) return;
  
      this.nodes[0].color = 'rgb(52, 152, 219)';
  
      let listNodes = this.nodes.map(x => x.id).join(',');
      let query = queries.co_evolution.replace('$(LIST)', listNodes);

      this.neo4jService.run(query).then(result => {
        result.records.forEach(r => {
          let index = _.findIndex(this.nodes, ['id', r.get('method_id')]);
  
          let classId = r.get('class_id').low;
  
          this.nodes[index].classId = classId;
          this.nodes[index].className = r.get('class_name');
          this.nodes[index].classQualifiedname = r.get('qualifiedname');
          this.nodes[index].classChangesCount = r.get('changes_count');
          this.nodes[index].coEvolutions = r.get('co_evolutions');
  
          this.classes.add(classId);
          this.classNames.add(r.get('class_name'));
        });
  
        this.setCoevolutionInGraph();

        this.getNoNameInfo();
      }).catch(e => {
        console.log(e);
      })
    }

    async getNoNameInfo(){
      let noNameNodes = this.nodes
      .filter(x=> x.method == 'no-name')
      .map(function(x: any){ return x.id.low});

      if (noNameNodes.length < 1) return;

      let query = queries.get_no_name_info.replace('$(LIST)', noNameNodes.join(','));
      

      this.neo4jService.run(query).then(result => {
        
        result.records.forEach(r => {
          let index = _.findIndex(this.nodes, ['id', r.get('method_id')]);
  
          let classId = r.get('class_id').low;
  
          this.nodes[index].method = r.get('method_name');
          this.nodes[index].classId = classId;
          this.nodes[index].className = r.get('class_name');
          this.nodes[index].classQualifiedname = r.get('qualifiedname');
          this.nodes[index].classChangesCount = r.get('changes_count');
        });
      }).catch(e => {
        console.log(e);
      })
    }
  
    setCoevolutionInGraph() {
      this.classes.forEach(c => {
        let methods = this.nodes.filter(x => _.findIndex(x.coEvolutions, function (sc) {
          return sc.id.low == c
        }) != -1);
  
        let classIndex = [];
  
        methods.forEach(m => {
          let index = _.findIndex(this.nodes, ['id', m.id]);
          let changes_count = _.find(m.coEvolutions, function (sc) {
            return sc.id.low == c;
          }).count.low;
  
          this.nodes[index].coEvolutionInGraph.push({ id: c, changes_count: changes_count });
  
          classIndex.push(index);
        });
  
        classIndex.forEach(n => {
          this.nodes[n].coEvolutionInGraph =
            _.orderBy(this.nodes[n].coEvolutionInGraph, ['changes_count'], ['desc']);
        })
      });
  
      let arrayClasses = Array.from(this.classes);
  
  
      this.nodes.forEach(n => {
  
        if (n.coEvolutionInGraph.length > 0) {
  
          let numClasses = 100.0 / (n.coEvolutionInGraph.length > 5 ? 5 : n.coEvolutionInGraph.length);
          let total = 0.0;
  
          n.gradient = [];
  
          n.coEvolutionInGraph.slice(0, 5).forEach(c => {
      
            let classIndex = arrayClasses.indexOf(c.id);
  
            let classColor = APP_CONFIG.colors.palette[classIndex % APP_CONFIG.colors.palette.length];
            n.gradient.push({ color: classColor, offset: total + '%' });
            total += numClasses;
          });
        }
      });
    }
  
    setSearchSubscription() {
      this.searchControl.valueChanges.subscribe(v=> {
  
        for ( let i = 0; i < this.nodes.length; i++) {
          this.nodes[i].filter = this.nodes[i].method.toLowerCase().indexOf(v.toLowerCase()) != -1;
        }  
  
        this.graph.refresh();
      })
    }
  
    sliderChange(value) {
      this.loaded = false;
      this.showTable = false;
      this.getStructuralCoupling();
      this.graph.refresh();
    }
  
    directionChange(value){
      this.relationshipType = value.value;
  
      this.loaded = false;
      this.getStructuralCoupling();
      this.graph.refresh()
    }

    open() {
      this.showTable = !this.showTable;
    }
}
