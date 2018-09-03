import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from '../models/client';
import { ClientService } from '../../services/client.service';

@Component({
    selector: 'app-services-client',
    templateUrl: './services-client.component.html',
    styleUrls: ['./services-client.component.css']
})
export class ServicesClientComponent implements OnInit {

    private _clientId: number;
    private _client: IClient;

    private _servicesClient: any[];

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _clientService: ClientService
    ) { }

    ngOnInit() {
        this._clientId = this._activatedRoute.snapshot.params.id;
        this._client = this._clientService.getClient(this._clientId);

        console.log(this._client);

        this._servicesClient = this._client.servicesClient;
    }

}
