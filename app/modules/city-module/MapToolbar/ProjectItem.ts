export class ProjectItem
{
    name:string;
    lat:number;
    lon:number;

    constructor(pname:string,plat:number,plon:number)
    {
        this.name=pname;
        this.lat=plat;
        this.lon=plon;
    }

}