import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators"
import { IClient } from '../components/models/client';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    public _clients: IClient[];


    constructor(
        private http: Http
    ) { }

    public getClients(){
        return this.http.get("http://localhost:51078/api/Clients").pipe(map((response: any) => {
            
            console.log('this is the response: ', response);

			let resp = response.json();

			return resp;
		}), catchError(error => {
			return throwError('Error consultando clientes: ' + error)
		}));
    }

    public postClient(client: IClient){
        return this.http.post("http://localhost:51078/api/Clients", client).pipe(map((response: any) => {
            
            console.log('this is the response: ', response);

            let resp = response.json();
            
            this._clients.push(resp);

			return resp;
		}), catchError(error => {
			return throwError('Error creando clientes: ' + error)
		}));
    }
}
