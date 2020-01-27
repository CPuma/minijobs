import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajosFirebaseService } from 'src/app/core/services/trabajos-firebase.service';

@Component({
  selector: 'app-modal-activar',
  templateUrl: './modal-activar.component.html',
  styleUrls: ['./modal-activar.component.css']
})
export class ModalActivarComponent implements OnInit {
  @Input() trabajo;
  @Input() estado: string;
  isActivation: boolean = false;
  
  constructor(public activeModal: NgbActiveModal, private trabajoFireService: TrabajosFirebaseService) { }

  ngOnInit() {
    if (this.estado.toUpperCase() == 'ACTIVO') {
			this.isActivation = true;
		}
		console.log('Trabajo', this.trabajo);
  }

  cambiarEstado() {
		this.trabajoFireService.estadoTrabajo(this.trabajo.idTrabajo, this.estado.toUpperCase());
		this.activeModal.close('Ok click');
	}
	cancelar() {
		this.activeModal.close('cancel click');
	}

}
