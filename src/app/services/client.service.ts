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

    public getClient(clientId: number){
        let _client = this._clients.filter(x => x.clientId == clientId)[0];

        return _client;
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

    public putClient(client: IClient, clientId: number){
        return this.http.put("http://localhost:51078/api/Clients/" + clientId, client).pipe(map((response: any) => {
            
            console.log('putClient(): response: ', response);
            let resp = response.json();
            
            this.updateClient(resp);

			return resp;
		}), catchError(error => {
			return throwError('Error editando clientes: ' + error)
		}));
    }

    public deleteClient(client: IClient){
        return this.http.delete("http://localhost:51078/api/Clients/" + client.clientId).pipe(map((response: any) => {
            
            console.log('deleteClient(): response: ', response);
            let resp = response.json();
            
            this.delClient(client);

			return resp;
		}), catchError(error => {
			return throwError('Error eliminando clientes: ' + error)
		}));
    }


    private delClient(client: IClient){
        let _client = this._clients.filter(x => x.clientId == client.clientId)[0];
        let _index = this._clients.indexOf(_client);

        this._clients.splice(_index, 1);
    }


    private updateClient(client: IClient){

        let _client = this._clients.filter(x => x.clientId == client.clientId)[0];
        let _index = this._clients.indexOf(_client);

        this._clients[_index] = client;

        // let _study = _user.employee.studies[0].filter(x => x.studyID == study.studyID)[0];
		// 	let _eLevel = _eduLevels.filter(x => x.educationalLevelID == study.level)[0];
		// 	let _index = _user.employee.studies[0].indexOf(_study);

		// 	study.level = _eLevel;

		// 	_user.employee.studies[0][_index] = study;
		// 	localStorage.setItem('user', JSON.stringify(_user));

    }
}
