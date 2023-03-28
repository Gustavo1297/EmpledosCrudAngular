import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { AddEditEmpleadosComponent } from './empleados/add-edit-empleados/add-edit-empleados.component';
import { EmpleadosApiService  } from "./empleados-api.service";

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    AddEditEmpleadosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EmpleadosApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
