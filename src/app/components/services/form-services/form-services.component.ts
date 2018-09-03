import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IService } from '../../models/service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../services/service.service';

@Component({
    selector: 'app-form-services',
    templateUrl: './form-services.component.html',
    styleUrls: ['./form-services.component.css']
})
export class FormServicesComponent implements OnInit {

    private formService: FormGroup;
    private _service: IService;
    private _serviceId: number;
    private _loading: boolean;

    private textTitle: string;
    private textBtn: string;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _serviceService: ServiceService
    ) { }

    ngOnInit() {
        document.querySelector('body').style.overflow = 'hidden';
        this._loading = false;
        this._serviceId = this._activatedRoute.snapshot.params.id;

        if (this._serviceId) {
            this._service = this._serviceService.getService(this._serviceId);
            this.textTitle = 'Editar Servicio';
            this.textBtn = 'Actualizar';
        } else {
            this.textTitle = 'Registrar Servicio';
            this.textBtn = 'Registrar';
            this._service = new IService();
        }

        this.initform();
    }


    public initform() {
        this.formService = new FormGroup({
            name: new FormControl(this._service.name, [
                Validators.required,
                // Validators.pattern(RegexUtils._rxEmail)
            ]),
            value: new FormControl(this._service.value, [
                Validators.required,
                // Validators.pattern(RegexUtils._rxEmail)
            ])
        });
    }

    public saveService() {
        if (this.formService.valid) {
            let client = this.formService.value;
            this._loading = true;

            if (this._serviceId) {

                this._service.name = client.name;
                this._service.value = client.value;

                this._serviceService.putService(this._service, this._serviceId).subscribe(response => {
                    console.log('saveService(): response: ', response);
                    this._loading = false;
                    this.cancelar();
                });
            } else {

                this._serviceService.postService(client).subscribe(response => {
                    console.log('saveService(): response: ', response);
                    this._loading = false;
                    this.cancelar();
                });
            }


        } else {
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
