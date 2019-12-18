import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Node } from '../../../neo4j/d3/models/node';


@Component({
  selector: 'app-coevolution-table',
  templateUrl: './coevolution-table.component.html',
  styleUrls: ['./coevolution-table.component.scss']
})
export class CoevolutionTableComponent implements OnInit, OnChanges {

  @Input() node: Node;
  @Input() classIds;
  @Input() classNames;

  list;


  constructor() { }

  ngOnInit() {
    this.chargeTable();
  }

  ngOnChanges(changes) {
    this.chargeTable();
  }

  chargeTable() {
    this.list = [];

    if (!this.node) return;

    let arrayClass = Array.from(this.classIds);
    let arrayClassNames = Array.from(this.classNames);

    this.node.coEvolutionInGraph.forEach(e => {
      let index = arrayClass.indexOf(e.id);

      this.list.push({id: e.id, count: e.changes_count, name: arrayClassNames[index]});
    });

    console.log(this.list);
  }

}
