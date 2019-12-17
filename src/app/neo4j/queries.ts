export const queries = {
    treeOut: 
      `
      match (m:Method)-[:CALLS]->(o:Method)
      where id(m)= $(METHOD_ID)
      return id(m) as id, 'call' as type, m.method as method,  collect(id(o)) as rels
      
      union

      match (m:Method) 
      where id(m)= $(METHOD_ID) with m
      match (m)-[:CALLS*1..$(DEEP_NUMBER)]->(n)
      with n
      match (n)-[:CALLS]->(o)
      return id(n) as id, 'call' as type, n.method as method, collect(id(o)) as rels
      `,

    treeIn: 
      `
      match (m:Method)<-[:CALLS]-(o:Method)
      where id(m)= $(METHOD_ID)
      return id(m) as id, 'called' as type, m.method as method,  collect(id(o)) as rels

      union

      match (m:Method) 
      where id(m)= $(METHOD_ID) with m
      match (m)<-[:CALLS*1..$(DEEP_NUMBER)]-(n)
      with n
      match (n)<-[:CALLS]-(o)
      return id(n) as id, 'called' as type, n.method as method, collect(id(o)) as rels
      `,

    co_evolution: 
      `
      match (m:Method)<-[:OWNS_METHOD]-(c:Class)-[r:CO_EVOLVE]-(c2:Class) 
      where id(m) in [$(LIST)]
      return 
      id(m) as method_id, 
      id(c) as class_id,
      c.name as class_name,
      c.qualifiedname as qualifiedname,  
      c.changes_count as changes_count,
      collect({id: id(c2), count: r.changes_count} ) as co_evolutions
      `,

    get_projects: 
      `
      match (p:Project)-[:HAS_COMMIT]->(co:Commit) 
      with  p,  count(co) as commits  
      match (p)-[:HAS_CLASS]->(c:Class) 
      return distinct p.id as id, commits as commits, count(c) as classes
      `,

    get_namespaces:
      `
      match (p:Project{id: '$(PROJECT_ID)'})-[:HAS_NAMESPACE]->(n:Namespace) with distinct n return id(n) as id, n.name as name, n.qualifiedname as qualifiedname order by n.name skip $(SKIP) limit $(LIMIT)
      `,

    get_total_namespaces:
      `
      match (p:Project{id: '$(PROJECT_ID)'})-[:HAS_NAMESPACE]->(n:Namespace) with distinct n return count(n) as total
      `,
    
    get_classes:
      `
      match (n:Namespace)-[:CONTAINS_CLASS]->(c:Class) 
      where id(n) = $(NAMESPACE_ID) 
      return  id(c) as id, c.name as name, c.qualifiedname as qualifiedname 
      order by c.name 
      skip $(SKIP) 
      limit $(LIMIT)
      `,

    get_total_classes:
      `
      match (n:Namespace)-[:CONTAINS_CLASS]->(c:Class) 
      where id(n) = $(NAMESPACE_ID) 
      return  count(c) as total
      `,

    get_methods:
      `
      match (c:Class)-[:OWNS_METHOD]->(m:Method) 
      where id(c)= $(CLASS_ID) 
      return id(m) as id, m.method as method, m.name as name, m.calledby as calledby, m.calls as calls 
      order by m.name 
      skip $(SKIP) 
      limit $(LIMIT)
      `,

    get_total_methods:
      `
      match (c:Class)-[:OWNS_METHOD]->(m:Method) 
      where id(c)= $(CLASS_ID) 
      return count(m) as total
      `,
    
    get_no_name_info:
      `
      match (m:Method)<-[:OWNS_METHOD]-(c:Class) 
      where id(m) in [$(LIST)]
      return id(m) as method_id,
      m.method as method_name, 
      id(c) as class_id,
      c.name as class_name,
      c.qualifiedname as qualifiedname,  
      c.changes_count as changes_count
      `,
  };