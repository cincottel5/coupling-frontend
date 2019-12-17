import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  project =  { url: '/', label: 'Proyecto' };
  namespace = { url: '/', label: 'Namespace' };
  class = { url: '/', label: 'Clase' };
  method = { url: '/', label: 'Metodo' };
  tree = { url: '/', label: 'Arbol' };

  step = 0;

  constructor(private router: Router) { }

  goTo(e) {
    this.router.navigate(e);
    
    if (e.url == this.method.url) return;
    this.method = null;

    if (e.url == this.class.url) return;
    this.class = null;

    if (e.url == this.namespace.url) return;
    this.namespace = null;

    if (e.url != this.project.url) return;
    this.project = null;
  }

  cleanFromProject() {
    this.project = null;   

    this.cleanFromNamespaces();
    this.step = 0;
  }

  cleanFromNamespaces() {
    this.namespace = null;
    
    this.cleanFromClasses();
    this.step = 1;
  }

  cleanFromClasses() {
    this.class = null;
    
    this.cleanFromMethods();
    this.step = 2;
  }

  cleanFromMethods() {
    this.method = null;
    
    this.cleanFromTree()
    this.step = 3;
  }

  cleanFromTree() {
    this.tree = null;
    this.step = 4;
  }

  getList() {
    let list =  [
      this.project,
      this.namespace, 
      this.class,
      this.method,
      this.tree
    ];

    return list.slice(0, this.step);
  }
}
