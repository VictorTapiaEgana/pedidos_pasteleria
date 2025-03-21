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
    tamanos: { tamano: string; precio: string }[];
};

export type rellenosType = {
    id:number,
    nombre:string
};

export type guadarPedidos = {
        fecha:string,
        producto:string,
        tamano:number,
        relleno:string,
        fotoTorta: boolean,
        nombreFoto:string,
        precio:string,
        detalle:string
}