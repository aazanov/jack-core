import * as Mongodb         from "mongodb";
import {MongoConfig}        from "../../config/mongo.config";
import {promisify}          from "util";

export class MongoClient {

    private db: any = null;

    public async connect() {
        let client = await promisify(Mongodb.connect)(MongoConfig.host);
        this.db = client.db(MongoConfig.database);
    }

    //SECTION SINGLETON -----------------------------------------------------------------------------------------------
    private static instance: MongoClient = null;

    static getInstance(){
        return this.instance || new MongoClient();
    }
}