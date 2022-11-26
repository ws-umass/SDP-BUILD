import type { NextApiRequest, NextApiResponse } from "next";
import database from "../../../database/connect";

interface databaseRequest extends NextApiRequest {
    body: {
        table: string,
        column: string,
        name: string
    };
}

interface databaseResponse {
    message?: string
    data?: any // TODO: specified the return type in database
}

async function handler(request: databaseRequest, response: NextApiResponse<databaseResponse>) {
    switch (request.method) {
        case "POST":
            if (!database.isConnected()) {
                try {
                    await database.connect();
                } catch (error) {
                    response.status(503).json({message: "Service Unavailable"});
                }
            }

            try {
                const data = await database.getName(request.body.table, request.body.column, request.body.name);
                response.status(200).json({data: data});
            }
            catch (error) {
                response.status(503).json({message: "Service Unavailable"});
                database.lostConnection();
            }

            break;
        default:
            response.status(400).json({message: "Bad Request"});
    }
}

export default handler;
