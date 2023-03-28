import { Component, Input } from '@angular/core';
import { EmpleadosApiService } from 'src/app/empleados-api.service';
import { AreasDto } from '../../dtos/areas.dto';

@Component({
  selector: 'app-add-edit-empleados',
  templateUrl: './add-edit-empleados.component.html',
  styleUrls: ['./add-edit-empleados.component.css'],
})
export class AddEditEmpleadosComponent {
  @Input() empleadosList: any;
  @Input() areasList!: AreasDto[];

  idEmpleado!: number;
  nombre!: string;
  apellido!: string;
  correo!: string;
  fecha_Ingreso!: Date;
  estatus!: number;
  idArea!: number;
  area!: string;

  //Regex
  unamePattern: RegExp = /^[a-zA-Z ]{2,254}$/;
  emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  showBtn!: boolean;
  constructor(private service: EmpleadosApiService) {}
  ngOnInit(): void {
    console.log(this.empleadosList);
    console.log(this.areasList);

    this.empleadosList.idEmpleado == 0
      ? (this.showBtn = true)
      : (this.showBtn = false);

    this.idEmpleado = this.empleadosList.idEmpleado;
    this.nombre = this.empleadosList.nombre;
    this.apellido = this.empleadosList.apellido;
    this.correo = this.empleadosList.correo;
    this.estatus = this.empleadosList.estatus;
    this.idArea = this.empleadosList.idArea;
    this.area = this.empleadosList.area;
  }

  validacionFormulario(request: any) {
    let response: boolean = true;
    console.log('Test: ' + this.unamePattern.test(request.nombre));
    if (!this.unamePattern.test(request.nombre)) {
      response = false;
      let showP = document.getElementById('nombreInput');
      showP!.style.display = 'block';
      setTimeout(() => {
        showP!.style.display = 'none';
      }, 3000);
    }
    if (!this.unamePattern.test(request.apellido)) {
      console.log(request.apellido);
      response = false;
      let showP = document.getElementById('apellidoInput');
      showP!.style.display = 'block';
      setTimeout(() => {
        showP!.style.display = 'none';
      }, 3000);
    }
    if (!this.emailPattern.test(request.correo)) {
      console.log(request.correo);
      response = false;
      let showP = document.getElementById('correoInput');
      showP!.style.display = 'block';
      setTimeout(() => {
        showP!.style.display = 'none';
      }, 3000);
    }

    return response;
  }

  addEmpleado() {
    let request = {
      idEmpleado: 0,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      idArea: this.idArea,
      area: '',
    };

    console.log('Response Validacio: ' + this.validacionFormulario(request));
    if (this.validacionFormulario(request)) {
      let closeModal = document.getElementById('add-edit-close-modal');
      this.service.addEmpleados(request).subscribe((res) => {
        if (res.code == 200) {
          let showAddSuccess = document.getElementById('add-success-alert');
          showAddSuccess!.style.display = 'block';
          closeModal?.click();
          setTimeout(() => {
            showAddSuccess!.style.display = 'none';
          }, 4000);
        } else {
          let showErrorSuccess = document.getElementById('add-error-alert');
          closeModal?.click();
          setTimeout(() => {
            showErrorSuccess!.style.display = 'none';
          }, 4000);
        }
      });
    }
  }

  updateEmpleado() {
    let request = {
      idEmpleado: this.idEmpleado,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      idArea: this.idArea,
      area: '',
    };

    if (this.validacionFormulario(request)) {
      let closeModal = document.getElementById('add-edit-close-modal');
      this.service.updateEmpleados(request).subscribe((res) => {
        if (res.code == 200) {
          let showAddSuccess = document.getElementById('update-success-alert');
          showAddSuccess!.style.display = 'block';
          closeModal?.click();
          setTimeout(() => {
            showAddSuccess!.style.display = 'none';
          }, 4000);
        } else {
          let showErrorSuccess = document.getElementById('update-error-alert');
          closeModal?.click();
          setTimeout(() => {
            showErrorSuccess!.style.display = 'none';
          }, 4000);
        }
      });
    }
  }
}
