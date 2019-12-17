import APP_CONFIG from '../../../app.config';
import * as d3 from 'd3';
import * as _ from 'lodash';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: number;
  label: string;
  method: string;

  classId: string;
  className: string;
  classQualifiedname: string;
  classChangesCount: number;

  coEvolutions: [];
  coEvolutionInGraph;

  linkCount: number = 0;

  filter;

  inCoEvolution = false;

  constructor(method) {
    this.coEvolutionInGraph = [];

    this.id = method.id;
    this.label = 'Class';
    this.method = method.method;
    this.filter = true;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    return 35;
  }

  get fontSize() {
    return (25 * this.normal() + 10) + 'px';
  }

  get gradientName() {
    return 'gradient'+this.id;
  }

  get fill() {
    return `url(#${this.gradientName})`;
  }

  get graphLabel() {
    let label = this.method.replace(/\(.*\)/g, '');
    return label.length > 9 ? `${label.substring(0,7)}..` : label;
    
  }

  gradient = [
    {offset: '0%', color: '#a18cd1'},
    {offset: '100%', color: '#a00'}
  ] 

  //   if ( this.coEvolutionInGraph.length < 1 ) {
  //     return `<stop offset="100%" stop-color="${APP_CONFIG.colors.default}"/>`;
  //   } else {
      
  //     let numClasses = 100.0 / (this.coEvolutionInGraph.length > 10 ? 10 : this.coEvolutionInGraph.length);
  //     let gradient = '';
  //     let total = 0.0;
  //     this.coEvolutionInGraph.slice(0,10).forEach(c => {
  //       let classIndex = _.findIndex(this.classes, ['id', c]);
  //       let classColor = APP_CONFIG.colors.palette[classIndex%APP_CONFIG.colors.palette.length];
  //       this.gradient.concat(`<stop offset="${total}%"  stop-color="${classColor}"/>`);
  //       total += numClasses;
  //     });


  //     console.log(gradient);
  //     return gradient;
  //   }
  // }

  color = "rgb(44, 62, 80)";
  // get color() {
  //   let index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
  //   return APP_CONFIG.SPECTRUM[index];
  // }
}
