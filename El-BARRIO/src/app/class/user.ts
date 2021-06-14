export class User {
    static sessionIn : boolean = false;
    static displayName:string = 'Mi cuenta';
    static data:any = {};

    constructor(){

    }

    static isSession() {
        return this.sessionIn;
    }

    static setData(data) {
        this.data = data;
        this.sessionIn = true;
    }

    static getData() {
        return this.data;
    }

    static logout() {
        this.data = {};
        this.sessionIn = false;
        this.displayName = 'Mi cuenta'
    }

    test(){}
}
