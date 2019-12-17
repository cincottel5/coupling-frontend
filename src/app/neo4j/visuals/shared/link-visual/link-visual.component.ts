import { Component, Input } from '@angular/core';
import { Link } from '../../../d3';

@Component({
  selector: '[linkVisual]',
  template: `
  <svg:g>
  <defs>
  <marker id="triangle" viewBox="0 0 10 10"
      refX="45" refY="5" 
      markerUnits="strokeWidth"
      markerWidth="10" markerHeight="10"
      orient="auto">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(165, 171, 182)"/>
  </marker>
  </defs>
    <svg:line
        class="link"
        [attr.x1]="link.source.x"
        [attr.y1]="link.source.y"
        [attr.x2]="link.target.x"
        [attr.y2]="link.target.y"
        marker-end="url(#triangle)">

    </svg:line>
    
  </svg:g>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent  {
  @Input('linkVisual') link: Link;
}
