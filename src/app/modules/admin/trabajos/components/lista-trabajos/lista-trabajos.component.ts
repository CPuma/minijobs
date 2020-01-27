import { Component, OnInit } from '@angular/core';

import { ModalActivarComponent } from '../modal-activar/modal-activar.component';
import { TrabajoInterface } from 'src/app/core/models/trabajo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajosFirebaseService } from 'src/app/core/services/trabajos-firebase.service';
import { map } from 'rxjs/operators';

const MODALS = {
	// formTrabajo: ModalCrearComponent,
	cambiarEstado: ModalActivarComponent
};

@Component({
  selector: 'app-lista-trabajos',
  templateUrl: './lista-trabajos.component.html',
  styleUrls: ['./lista-trabajos.component.css']
})
export class ListaTrabajosComponent implements OnInit {
  closeResult: string;
	trabajos: TrabajoInterface[] | any;
  constructor(private modalService:NgbModal, private trabajoFireService:TrabajosFirebaseService) { }

  ngOnInit() {
    this.listarTrabajos()
  }
  listarTrabajos(orderby?: string) {
		this.trabajoFireService
			.listaTrabajos(orderby)
			.snapshotChanges()
			.pipe(map((changes) => changes.map((c) => c.payload.val())))
			.subscribe((trabajos) => {
				this.trabajos = trabajos;
				console.log(this.trabajos);
			});
  }
  buscarTrabajo(idSocioJob) {
		this.trabajoFireService.buscarTrabajoxSocioJob(idSocioJob).then((trabajos) => (this.trabajos = trabajos)).catch((error) => {
			console.log(error);
			return [];
		});
	}
  open(nameModal: string, trabajo?, estado?: string) {
		const modalRef = this.modalService.open(MODALS[nameModal]);
		modalRef.componentInstance.trabajo = trabajo;
		if (nameModal == 'cambiarEstado') {
			modalRef.componentInstance.estado = estado;
		}
	}

}
