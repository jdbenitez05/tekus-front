import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators"
import { IService } from '../components/models/service';


@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    public _services: IService[];

    constructor(
        private http: Http
    ) { }

    public getServices(){
        return this.http.get("http://localhost:51078/api/Services").pipe(map((response: any) => {
            
            console.log('this is the response: ', response);

			let resp = response.json();

			return resp;
		}), catchError(error => {
			return throwError('Error consultando servicios: ' + error)
		}));
    }

    public getService(serviceId: number){
        let _service = this._services.filter(x => x.serviceId == serviceId)[0];

        return _service;
    }

    public postService(Service: IService){
        return this.http.post("http://localhost:51078/api/Services", Service).pipe(map((response: any) => {
            
            console.log('this is the response: ', response);

            let resp = response.json();
            
            this._services.push(resp);

			return resp;
		}), catchError(error => {
			return throwError('Error creando servicios: ' + error)
		}));
    }

    public putService(service: IService, serviceId: number){
        return this.http.put("http://localhost:51078/api/Services/" + serviceId, service).pipe(map((response: any) => {
            
            console.log('putService(): response: ', response);
            let resp = response.json();
            
            this.updateService(resp);

			return resp;
		}), catchError(error => {
			return throwError('Error editando servicios: ' + error)
		}));
    }

    public deleteService(service: IService){
        return this.http.delete("http://localhost:51078/api/Services/" + service.serviceId).pipe(map((response: any) => {
            
            console.log('deleteService(): response: ', response);
            let resp = response.json();
            
            this.delService(service);

			return resp;
		}), catchError(error => {
			return throwError('Error eliminando servicios: ' + error)
		}));
    }


    private delService(service: IService){
        let _service = this._services.filter(x => x.serviceId == service.serviceId)[0];
        let _index = this._services.indexOf(_service);

        this._services.splice(_index, 1);
    }


    private updateService(service: IService){

        let _service = this._services.filter(x => x.serviceId == service.serviceId)[0];
        let _index = this._services.indexOf(_service);

        this._services[_index] = service;
    }
}
