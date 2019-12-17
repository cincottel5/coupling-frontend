import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as neo4j from 'neo4j-driver';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {

  protected driver;

  constructor() { 
    
    try {
      this.driver = neo4j.driver(
        `bolt://${environment.neo4j_host}:${environment.neo4j_port}`,
        neo4j.auth.basic(environment.neo4j_user, environment.neo4j_pass))
    } catch (e) {
      throw e;
    }
  }

  /**
   * Basic simple query
   * @param query 
   */
  public async run(query) {
    let session = this.driver.session();

    return await session
      .run(query)
      .then( result => {
        session.close();
        return result;
      })
      .catch( error => {
        session.close();
        throw error;
      });
  }
}
