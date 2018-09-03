import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FormClientComponent } from './components/clients/form-client/form-client.component';
import { ServicesComponent } from './components/services/services.component';
import { FormServicesComponent } from './components/services/form-services/form-services.component';
import { ServicesClientComponent } from './components/services-client/services-client.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'services-client/:id',
        component: ServicesClientComponent
    },

    {
        path: 'clients',
        component: ClientsComponent,
        children: [
            {
                path: 'form-client',
                component: FormClientComponent,
                outlet: 'modal'
            },
            {
                path: 'form-client/:id',
                component: FormClientComponent,
                outlet: 'modal'
            }
        ]
    },
    {
        path: 'services',
        component: ServicesComponent,
        children: [
            {
                path: 'form-service',
                component: FormServicesComponent,
                outlet: 'modal'
            },
            {
                path: 'form-service/:id',
                component: FormServicesComponent,
                outlet: 'modal'
            }
        ]
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }