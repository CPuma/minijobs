export enum ETipoTrabajo {
	Reparacion = 0,
	Limpieza = 1,
	Pintura = 2
}
export enum EEstadoTrabajo {
	Pendiente = 0,
	Coordinado = 1,
	Completado = 2,
	Cancelado = 3
}
export interface Trabajo {
	key?: String;

	'codigo': String;
	'titulo': String;

	'codigoMultiJob': String;
	'codigoSocioJob': String; // numeros
	'estado': EEstadoTrabajo; //"coordinado",

	'distrito': String; // DEBERIAMOS DEFINIRLOSSS ... TAMBIEN PROVINCIA por COD UBIGEO
	'direccion': String;

	'fechaCreacion': Date;

	'tipoTrabajo': ETipoTrabajo; // Deberia ser Number y nosotros definir los tipos
	'especificacion': String;
	'fecharabajo': Date; // fecha y hora juntos DATETIME
	//   "horaTrabajo" : "18:00",

	'cobranzaMiniJobs': Number;
	'cobranzaCulqi': Number;

	'pagoEditado': Number;
	'pagoMultijob': Number;
	'pagoSocioJob': Number;
}

// EJEMPLO
/**
 * enum ETypeId {
    alpha  = "a",
    beta   = "b",
    gamma  = "g"
}

interface IType {
    id:     ETypeId,
    title:  string,
}

const myMap: Map<string, IType> = new Map( [
   [ ETypeId.alpha,  { id: ETypeId.alpha, title: "Alpha" } ],
   [ ETypeId.beta,  { id: ETypeId.beta,  title: "Beta"  } ],
   [ ETypeId.gamma, { id: ETypeId.gamma, title: "Gamma" } ]
]);

console.log(myMap.get(ETypeId.alpha))
 */
