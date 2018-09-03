
export class IClient {
    public clientId: number;
    public nit: string;
    public name: string;
    public email: string;
    public timeCreated: Date;
    public timeUpdated: Date;

    public servicesClient: any[];

    public constructor() {
        this.clientId = null;
        this.nit = "";
        this.name = "";
        this.email = "";
        this.timeCreated = null; 
        this.timeUpdated = null;
    }
}