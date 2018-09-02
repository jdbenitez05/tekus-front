import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IClient } from '../../models/client';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
    selector: 'app-form-client',
    templateUrl: './form-client.component.html',
    styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {

    private formClient: FormGroup;
    private _client: IClient;
    private _clientId: number;
    private _loading: boolean;

    private textTitle: string;
    private textBtn: string;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _clientService: ClientService
    ) { }

    ngOnInit() {
        document.querySelector('body').style.overflow = 'hidden';
        this._loading = false;
        this._clientId = this._activatedRoute.snapshot.params.id;

        if(this._clientId){
            this._client = this._clientService.getClient(this._clientId);
            this.textTitle = 'Editar Cliente';
            this.textBtn = 'Actualizar';
        }else{
            this.textTitle = 'Registrar Cliente';
            this.textBtn = 'Registrar';
            this._client = new IClient();
        }

        this.initform();
    }


    public initform(){
        this.formClient = new FormGroup({
			name: new FormControl(this._client.name, [
				Validators.required,
				// Validators.pattern(RegexUtils._rxEmail)
			]),
			nit: new FormControl(this._client.nit, [
				Validators.required,
				// Validators.pattern(RegexUtils._rxEmail)
			]),
			email: new FormControl(this._client.email, [
				Validators.required,
				// Validators.pattern(RegexUtils._rxEmail)
			])
		});
    }

    public saveClient(){
        if(this.formClient.valid){
            let client = this.formClient.value;
            this._loading = true;

            if(this._clientId){

                this._client.nit = client.nit;
                this._client.name = client.name;
                this._client.email = client.email;

                this._clientService.putClient(this._client, this._clientId).subscribe(response => {
                    console.log('saveClient(): response: ', response);
                    this._loading = false;
                    this.cancelar();
                });
            }else{

                this._clientService.postClient(client).subscribe(response => {
                    console.log('saveClient(): response: ', response);
                    this._loading = false;
                    this.cancelar();
                });
            }
            

        }else{
            alert("Datos registrados de manera incorrecta");
        }
    }

    public cancelar() {
		this._router.navigate(
			[
				{
					outlets: {
						modal: null
					}
				}
			],
			{
				relativeTo: this._activatedRoute.parent // <--- PARENT activated route.
			}
		);

		document.querySelector('body').style.overflow = 'auto';
	}
}
