import * as Mongoose         from "mongoose";
import {MongoConfig}        from "../../config/mongo.config";
import {promisify}          from "util";

export class MongoClient {

    private catalogClient: any = null;
    private appClient: any = null;

    get catalog(): Mongoose{
        return this.catalogClient;
    }

    get app(): Mongoose{
        return this.appClient;
    }

    public async connect() {
        this.catalogClient = await Mongoose.createConnection(MongoConfig.host + MongoConfig.catalog);
        this.appClient = await Mongoose.createConnection(MongoConfig.host + MongoConfig.app);
    }

    //SECTION SINGLETON -----------------------------------------------------------------------------------------------
    private static instance: MongoClient = null;

    static getInstance(){
        return this.instance || (this.instance = new MongoClient());
    }
}