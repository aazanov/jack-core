import {MongoClient}                from "./engine/datasource/mongo/mongo.client";
import {Engine}                     from "./engine/engine";

(async () => {
    try {
        await MongoClient.getInstance().connect();
        let engine = new Engine();
    } catch (e) {
        console.log(e);
    }
})();