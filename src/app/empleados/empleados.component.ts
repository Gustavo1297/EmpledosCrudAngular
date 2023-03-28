import { Component } from '@angular/core';
import { EmpleadosApiService } from 'src/app/empleados-api.service';
import { EmpleadosDto } from '../dtos/empleados.dto';
import { AreasDto } from '../dtos/areas.dto';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent {
  empleadosList!: EmpleadosDto[];
  areasList!: AreasDto[];

  //Variables AddEditModal
  modalTitle!: string;
  modalTitleDelete: string ="Eliminar empleado";
  showModal: boolean = false;
  showModalDelete: boolean = false;
  empleados: any;

  constructor(private service: EmpleadosApiService) {}
  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this.service.getEmpleados().subscribe((res) => {
      this.empleadosList = res.data.empleados;
      this.areasList = res.data.areas;
      console.log(res);
    });
  }

  deleteEmpleados(){
    let closeModal = document.getElementById('add-edit-close-modal');
    this.service.deleteEmpleados(this.empleados).subscribe((res) => {
      if (res.code == 200) {
        console.log(this.showModal);
        
        this.showModalDelete=false;
        let showAddSuccess = document.getElementById('delete-success-alert');
        showAddSuccess!.style.display = 'block';
        closeModal?.click();
        setTimeout(() => {
          showAddSuccess!.style.display = 'none';
        }, 4000);
        this.empleados=[];
      } else {
        let showErrorSuccess = document.getElementById('delete-error-alert');
        closeModal?.click();
        setTimeout(() => {
          showErrorSuccess!.style.display = 'none';
        }, 4000);
      }
    });
  }

  modalClose() {
    this.showModal = false;
    this.getEmpleados();
  }

  ModalAdd() {
    this.empleados = {
      idEmpleado: 0,
      nombre: null,
      apellido: null,
      correo: null,
      fecha_Ingreso: null,
      estatus: null,
      idArea: null,
      area: null,
    };
    this.modalTitle = 'Agregar Empleado';
    this.showModal = true;
  }
  ModalEdit(item: EmpleadosDto) {
    console.log('ModalEdit');
    
    this.empleados = item;
    this.modalTitle = 'Modificar Empleado';
    this.showModal = true;
  }

  ModalDelete(item: EmpleadosDto) {
    console.log('ModalDelete');
    console.log(item);
    this.empleados = item;
    this.showModalDelete = true;
    this.modalTitle = 'Eliminar Empleado';
    this.showModal = true;
  }
}
