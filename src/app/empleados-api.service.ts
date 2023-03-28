import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosApiService {

  readonly empleadoApiUrl = "https://localhost:7262/api/Empleados";
  constructor(private htttp:HttpClient) {}
   
  getEmpleados():Observable<any>{
    return this.htttp.post<any>(this.empleadoApiUrl + '/getEmpleados',{});
  }

  getIdEmpleados(data:any){
    return this.htttp.post<any>(this.empleadoApiUrl + '/getIdEmpleados',data);
  }

  addEmpleados(data:any){
    return this.htttp.post<any>(this.empleadoApiUrl + '/addEmpleados',data);
  }

  updateEmpleados(data:any){
    return this.htttp.post<any>(this.empleadoApiUrl + '/updateEmpleados',data);
  }

  deleteEmpleados(data:any){
    return this.htttp.post<any>(this.empleadoApiUrl + '/deleteEmpleados',data);
  }


}
