import {MongoClient}                from "./engine/datasource/mongo/mongo.client";
import {Engine}                     from "./engine/engine";
import {DAO}                        from "./engine/datasource/dao/dao";

(async () => {
    try {
        await MongoClient.getInstance().connect();
        let engine = new Engine();

        await new DAO().getDocument();
    } catch (e) {
        console.log(e);
    }
})();