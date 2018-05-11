import {MessageType} from "../message.type/message.type";

export class Message {
    constructor (
        public type         : MessageType,
        public catcher      : string,
        public emitter      : string,
        public payload?     : any
    ){}
}