export class Class{
    /**
     * Id del namespace
     */
    id;

    /**
     * Nombre del namespace
     */
    name;

    /**
     * Nombre completo de neo4j del 
     * namespace
     */
    qualifiedname;

    constructor(neo4jRecord) {
        if (null == neo4jRecord ) throw new Error('Invalid record');

        try {
            this.id = neo4jRecord.get('id').low;
            this.name = neo4jRecord.get('name');
            this.qualifiedname = neo4jRecord.get('qualifiedname');
        } catch (e) {
            throw e;
        }
        
    }
}