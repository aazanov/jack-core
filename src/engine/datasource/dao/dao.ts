import {MongoClient}                from "../mongo/mongo.client";
import Brands                       from "./models/base";

export class DAO {


    public async getDocument(uuid: string = null){
        // if (!uuid) return { structure: {}};

        let client = MongoClient.getInstance().catalog;
        let Model = client.model('brands', Brands);
        let result = new Model();
        result.name = 'legrand';
        result.save();

    }
}