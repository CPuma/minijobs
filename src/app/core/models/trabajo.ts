
export interface TrabajoInterface {
	// key?: string;
	idTrabajo : string,
	
	cobranzaMiniJob : number,
    cobranzaPasarela : number,
    direccion : string,
    distrito : string,
    especificacion : string,
    estado : string, //"COMPLETADO",
    fechaCreacionTrabajo : string,
    fechaTrabajo : string,
    horaCreacionTrabajo : string,
    horaTrabajo : string,
    idMultiJob : string,
    idSocioJob : string,
    pagoEditado : number,
    pagoMultiJob : number,
    pagoSocioJob : number,
    primerCalificador : string ,//"72935140",
    tipoTrabajo : string,
    titulo : string

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
