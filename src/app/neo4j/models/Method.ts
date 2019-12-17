export class Method{
    /**
     * Id del namespace
     */
    id;

    /**
     * nombre del metodo
     */
    method;

    /**
     * Nombre del namespace
     */
    name;

    /**
     * Llamadas salientes
     */
    calls;

    /**
     * Llamadas entrantes
     */
    calledBy;

    constructor(neo4jRecord) {
        if (null == neo4jRecord ) throw new Error('Invalid record');

        try {
            this.id = neo4jRecord.get('id').low;
            this.name = neo4jRecord.get('name');
            this.method = neo4jRecord.get('method');
            this.calls = neo4jRecord.get('calls').low;
            this.calledBy = neo4jRecord.get('calledby').low;
        } catch (e) {
            throw e;
        }
        
    }
}