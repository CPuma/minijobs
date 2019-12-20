import { TestBed } from '@angular/core/testing';

import { UsuariosFirebaseService } from './usuarios-firebase.service';
import { setServers } from 'dns';
import { Usuario } from 'src/app/shared/models/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';

fdescribe('UsuariosFirebaseService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: UsuariosFirebaseService = TestBed.get(UsuariosFirebaseService);
		expect(service).toBeTruthy();
	});


});
