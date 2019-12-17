export class Project {
    
    /**
     * Id del proyecto
     */
    id;

    /**
     * Cantidad de commits del proyecto
     */
    commits;

    /**
     * Cantidad de clases del proyecto
     */
    classes;

    constructor(neo4jRecord) {
        if (null == neo4jRecord ) throw new Error('Invalid record');

        try {
            this.id = neo4jRecord.get('id');
            this.commits = neo4jRecord.get('commits').low;
            this.classes = neo4jRecord.get('classes').low;
        } catch (e) {
            throw e;
        }
        
    }
}