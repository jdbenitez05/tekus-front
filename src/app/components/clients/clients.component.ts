import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { IClient } from '../models/client';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    private _client: IClient;

    get clients(): IClient[]{
        return this._clientService._clients;
    }
    // private clients: IClient[];

    constructor(
        private _clientService: ClientService
    ) { }

    ngOnInit() {
        this._clientService.getClients().subscribe(response => {
            console.log('ngOnInit(): response; ', response);
            this._clientService._clients = response;
        });
    }

    deleteClient(client: IClient){
        this._client = client;

        if(confirm('¿Esta seguro que desea eliminar el cliente: ' + client.name + '?')){
            this._clientService.deleteClient(client).subscribe(Response => {
                alert('Se ha eliminado el cliente');
            });
        }

    }

}
