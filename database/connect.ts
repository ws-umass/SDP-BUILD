import {PoolConfig} from "pg";
import Database from "./database";
import "dotenv/config";

// TODO: move to .env, ignore before commit
const credentials: PoolConfig = {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
};

const database = new Database(credentials);

export default database;
