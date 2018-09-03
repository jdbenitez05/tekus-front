import { Component, OnInit } from '@angular/core';
import { IService } from '../models/service';
import { ServiceService } from '../../services/service.service';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

    private _service: IService;

    get services(): IService[]{
        return this._serviceService._services;
    }

    constructor(
        private _serviceService: ServiceService
    ) { }

    ngOnInit() {
        this._serviceService.getServices().subscribe(response => {
            console.log('ngOnInit(): response', response);
            this._serviceService._services = response;
        });
    }

    deleteService(service: IService){
        this._service = service;

        if(confirm("¿Esta seguro que desea eliminar el servicio: " + service.name + "?")){
            this._serviceService.deleteService(service).subscribe(response => {
                alert("Se ha eliminado el servicio");
            });
        }
    }

}
