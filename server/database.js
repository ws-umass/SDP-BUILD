import pg from "pg";
import "dotenv/config";

// get the Pool class from the pg module
const { Pool } = pg;

export class Database {
    constructor(credentials) {
        this.connectionStatus = false;

        const pool = new Pool(credentials);
        this.getPool = (dbToken) => dbToken === process.env.DB_TOKEN ? pool : undefined;
    }

    async connect() {
        // create the pool
        this.client = await this.getPool(process.env.DB_TOKEN).connect();
        this.connectionStatus = true;
        console.log("Database Successfully Connected!");
    }

    async addUserTable() {
        const queryText = `
            CREATE TABLE IF NOT EXISTS userTable (
                username VARCHAR(30),
                password VARCHAR(30)
            );
        `;
        await this.client.query(queryText);
    }

    async writeUserData(username, password) {
        await this.addUserTable();
        const queryText = `
            INSERT INTO userTable (username, password)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const res = await this.client.query(queryText, [username, password]);
        console.log(res.rows);
    }

    async readUser() {
        await this.addUserTable();
        try {
            const res = await this.client.query("SELECT * FROM userTable");
            return res.rows;
        }
        catch (error) {
            return [];
        }
    }

    // async addTable() {
    //     const queryText = `
    //         CREATE TABLE IF NOT EXISTS userTable (
    //             username VARCHAR(30),
    //             password VARCHAR(30)
    //         );
    //     `;
    //     await this.client.query(queryText);
    // }
}
