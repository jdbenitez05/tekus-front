import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientService } from './services/client.service';
import { HttpModule } from '@angular/http';
import { FormClientComponent } from './components/clients/form-client/form-client.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent,
    ClientsComponent,
    FormClientComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
		FormsModule,
		ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
