import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphNodeService {

  public emitter = new EventEmitter<any>();
  public node;

  constructor() { }

  setNode(node) {
    this.node = node;
    this.emitter.emit(node);
  }
}
