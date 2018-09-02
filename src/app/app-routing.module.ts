import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FormClientComponent } from './components/clients/form-client/form-client.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'clients',
        component: ClientsComponent,
        children: [
            {
                path: 'form-client',
                component: FormClientComponent,
                outlet: 'modal'
            }
        ]
    },
    // {
    //     path: 'reserve/:id',
    //     component: ReservationsComponent,
    //     outlet: 'modal'
    // }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }