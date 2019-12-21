export enum ESexo {
	Masculino = 'M',
	Femenino = 'F'
}
// export enum EEstadoUsuario {
// 	Pendiente = 0,
// 	Activo = 1,
// 	Suspendido = 2
// }
export enum EDocumentoTipo {
	Dni = 'DNI',
	passaporte = 'PASSPORTE',
	carnet_extranjeria = 'CARNET DE EXTRANJERIA'
}
export interface Roles{
	admin?:boolean;
	afiliador?:boolean;
	socioJob?:boolean;
	usuario?:boolean;
}

export interface UsuarioInterface {
	id?: string; // se toma del uid -- del  inicio de sesion por  al registrar
	
	// usuario?:string;	// YA NO VA
	// contrasenia?: string;	// YA NO VA
	// codigo?: string;	// No se para que es esto ????????

	apellidoMaterno: string;
	apellidoPaterno: string;
	nombres: string;

	email: string;
	celular: string;
	direccion: string;

	estado:string;	// si solo es activo e inactivo BOOLEAN true o false
	// estado:  SI ES INT --> //  0 inactivo, 1 activo, 2 suspendido

	fechaNacimiento: Date;
	fechaCreacion: Date;
	genero: ESexo; // M masculino, F Femenino (SOLO UNA LETRA)
	documentoTipo: EDocumentoTipo; //(1)DNI , (2)PASSPORTE ,(3)CARNET DE EXTRANJERIA  deberia ser con INT
	documentoNumero: string;

	banco?: string;
	observacion?: string;
	numeroCuenta?: string;

	roles:Roles		// array { admin:false, afiliador:true, usuario:true}
	isProfileComplete:boolean;// si se registra por google pero aun no completa sus DATOS... debera redireccionarlo para que termine de registrarse bien
}
