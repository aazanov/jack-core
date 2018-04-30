import * as Mongodb         from "mongodb";
import {MongoConfig}        from "../../config/mongo.config";
import {promisify}          from "util";

export class MongoClient {

    private db: any = null;

    public async connect() {
        let client = await promisify(Mongodb.connect)(MongoConfig.host);
        this.db = client.db(MongoConfig.database);
    }

    static instance: any = null;

    static getInstance(): any {
        return this.instance = this.instance || new MongoClient();
    }
}