
export class IService{
    public serviceId: number;
    public name: string;
    public value: number;
    public timeCreated: Date;
    public timeUpdated: Date;

    public constructor(){
        this.serviceId = null;
        this.name = "";
        this.value = 0;
        this.timeCreated = null;
        this.timeUpdated = null;
    }
}