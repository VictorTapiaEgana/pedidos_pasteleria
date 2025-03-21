import { ProductoConTamanos } from "../../type/types";
import { supabase } from "../createConecction";

export default async function getProductos(): Promise<ProductoConTamanos[]> {
    
    const { data, error } = await supabase
        .from("tamano")
        .select(`
                id, tamano, precio, id_prod,
                productos (id, tipo, nombre)
        `);    

    if (!data || data.length === 0 || error) {        
        return [];
    }
    
    const productosMap = new Map<number, ProductoConTamanos>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.forEach((item: any) => {
        const producto = item.productos; 

        if (!producto || producto.length === 0) return;

        const productoId = producto.id;

        if (!productosMap.has(productoId)) {
            productosMap.set(productoId, {
                id: productoId,
                tipo: producto.tipo,
                nombre: producto.nombre,
                tamanos: [], 
            });
        }

        productosMap.get(productoId)!.tamanos.push({
            tamano: item.tamano,
            precio: item.precio,
        });
    });

    return Array.from(productosMap.values());
}
