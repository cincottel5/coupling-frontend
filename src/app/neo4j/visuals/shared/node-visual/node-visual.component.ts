import { Component, Input } from '@angular/core';
import { Node } from '../../../d3';
import { GraphNodeService } from '../../../../services/graph-node.service';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'" (click)="clickNode()">
    <defs>
      <linearGradient [id]="node.gradientName">
        <ng-container *ngFor="let i of node.gradient">
          <stop [attr.offset]="i.offset"  [attr.stop-color]='i.color'/>
        </ng-container>
      </linearGradient>
    </defs>
    <svg:circle
          class="node-back"
          [ngClass]="{'no-selected-node': !node.filter}"
          [attr.fill]="node.fill"
          cx="0"
          cy="0"
          [attr.r]="node.r">
          
      </svg:circle>
      <svg:circle
          class="node"
          [ngClass]="{'no-selected-node': !node.filter, 'in-coevolution': node.inCoEvolution, 'selected-node': (this.graphNodeService.node != null && this.graphNodeService.node.classId == node.classId) }"
          [attr.fill]="node.color"
          cx="0"
          cy="0"
          [attr.r]="30">
          <title>
            {{node.method}}
          </title>
      </svg:circle>
      
      <svg:text
          class="node-name"
          [ngClass]="{'in-coevolution-text': node.inCoEvolution}"
          [attr.font-size]="node.fontSize">
        {{node.graphLabel}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;


  constructor(private graphNodeService: GraphNodeService) {}

  clickNode() {
    
    this.graphNodeService.setNode(this.node);
  }
}


