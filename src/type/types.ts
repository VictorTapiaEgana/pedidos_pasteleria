export type productType = {
    id:number,
    tipo:string,
    nombre:string
};

export type sizeType ={
    id:number,
    tamano:string,
    precio:string,
    id_prod:number
};

export type ProductoConTamanos = {
    id: number;
    tipo: string;
    nombre: string;
    tamanos: { tamano: string; 
               precio: string 
             }[];
};

export type rellenosType = {
    id:number,
    nombre:string,
    especial:boolean,
    valor:number
};

export type guadarPedidos = {
    fecha:Date,
    producto:string,
    tamano:number,
    relleno:string,
    fotoTorta: boolean,
    nombreFoto:string,
    precio:string,
    detalle:string,
    moldeRedondo:boolean,
    rellenoEspecial:boolean
};

export type finalizarPedido = {
    nombre:string,
    telefono:string,
    horario:string,
    areparto:boolean,
    direccion:string,
    valorReparto:string,
    abono:string,
    total:string,    
};

export type getPedido = {
        fecha:Date,
        cliente:string,
        direccion:string,
        horario:string,
        domicilio:boolean,
        pagado:string,
        abono:number,
        total:number,
        valorReparto:number,
        telefono:string,
        detalle_pedidos:{ id:number,
                          id_pedido:number,
                          nombre:string,
                          tamano:string,
                          rellenos:string,
                          foto:boolean,
                          detalles:string,
                          imagen:string,
                          moldeRedondo:boolean
                        }[];
}

export type CalendarDayProps = {
    listaPedidos: getPedido[],
    fetchPedidos:()=> void;

  };

  export type CalendarEvent = {
      id: string;
      title: string;
      start: Date | string;
      end?: Date | string;
      allDay?: boolean;
      backgroundColor?: string;
      extendedProps: {
      domicilio: boolean;
      direccion: string;
      pagado: string;
      abono: number;
      total: number;
      valorReparto: number;
      productos: {
                id: number;
                nombre: string;
                tamano: string;
                rellenos: string;
                foto: boolean;
                detalles: string;
                imagen: string;
                moldeRedondo: boolean;
      }[];
    };
  };

  export type DetalleProd= {
    id: number;
    nombre: string;
    tamano: string;
    rellenos: string;
    foto: boolean;
    detalles: string;
    imagen: string;
    moldeRedondo: boolean;
  }
  
  export type Usuario = {
     nombre:string;
     contrasena:string

  }