// export enum ESexo {
// 	MASCULINO = 'M',
// 	FEMENINO = 'F'
// }
// export enum EEstadoUsuario {
// 	Pendiente = 0,
// 	Activo = 1,
// 	Suspendido = 2
// }
export enum EDocumentoTipo {
	DNI = 'DNI',
	PASAPORTE = 'PASAPORTE',
	CARNET_EXTRANJERIA = 'CARNET DE EXTRANJERIA'
}
export interface Roles{
	admin?:boolean;
	afiliador?:boolean;
	socioJob?:boolean;
	usuario?:boolean;	// TRUE
}

export interface UsuarioInterface {
	id?: string; // se toma del uid -- del  inicio de sesion por  al registrar
	
	usuario?:string;	// NO DEBERIA IR
	contrasenia?: string;	// YA DEBERIA IR

	apellidoPaterno: string;
	apellidoMaterno: string;
	nombres: string;

	// email: string;  // APARENTEMENTE YA NO
	celular: string;
	direccion: string;

	estado:string;	// si solo es activo e inactivo BOOLEAN true o false
	// estado:  SI ES INT --> //  0 inactivo, 1 activo, 2 suspendido

	fechaNacimiento: Date;
	fechaCreacion: Date;
	genero: string; // MASCULINO, FEMENINO
	documentoTipo: EDocumentoTipo; //(1)DNI , (2)PASSPORTE ,(3)CARNET DE EXTRANJERIA  deberia ser con INT
	documentoNumero: string;

	banco?: string;
	observacion?: string;
	numeroCuenta?: string;

	roles:Roles		// array { admin:false, afiliador:true, usuario:true}

}
