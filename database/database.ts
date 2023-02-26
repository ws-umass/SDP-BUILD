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

    async addUserTable() {
        const queryText = `
            CREATE TABLE IF NOT EXISTS userTable (
                username VARCHAR(30),
                password VARCHAR(30)
            );
        `;
        await this.client?.query(queryText);
    }

    async writeUserData(username: string, password: string) {
        await this.addUserTable();
        const queryText = `
            INSERT INTO userTable (username, password)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const res = await this.client?.query(queryText, [username, password]);
        console.log(res?.rows);
    }

    async readUser() {
        await this.addUserTable();
        try {
            const res = await this.client?.query("SELECT * FROM userTable");
            return res?.rows;
        }
        catch (error) {
            return [];
        }
    }
}

export default Database;