import {Pool, PoolConfig, PoolClient} from "pg";

class Database {
    private credentials: PoolConfig;
    private pool: Pool | undefined;
    private client: PoolClient | undefined;
    private connectionStatus: boolean

    constructor(credentials: PoolConfig) {
        this.credentials = credentials;
        this.connectionStatus = false;
    }

    isConnected() {
        return this.connectionStatus;
    }

    lostConnection() {
        this.connectionStatus = false;
    }

    async connect() {
        this.pool = new Pool(this.credentials);
        this.client = await this.pool.connect();
        this.connectionStatus = true;
        console.log("Database Successfully Connected!");
    }

    async getTop10(table: string) {
        const queryText: string = `SELECT * FROM ${table} ORDER BY ID ASC LIMIT 10;`;
        const res = await this.client?.query(queryText);
        return res?.rows;
    }

    async getName(table: string, column: string, name: string) {
        const queryText: string = `SELECT * FROM ${table} WHERE LOWER(${column}) LIKE '%${name.toLowerCase()}%';`;
        const res = await this.client?.query(queryText);
        return res?.rows;
    }
}

export default Database;