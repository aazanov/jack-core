export class Utils {
    static createUUID(): string {
        let s4 = ()=> {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        let time = new Date().getTime().toString(16);
        let result = (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + 'xxxxxxxx');
        return result.substring(0, result.length - time.length) + time;
    }
}