import {Transport}              from "./infastructure/transport/transport";
import {TransportConfig}        from "./config/transport.config";

export class Engine {

    constructor(){
        Transport.getInstance().listen(TransportConfig.publicPort);
    }

}