import { getPedido } from "../../../type/types"
import { supabase } from "../../createConecction"

export default async function getPedidos():Promise<getPedido[]>{    
    
    try {
           
        const { data } = await supabase.from('pedidos')
                                        .select (`
                                                  fecha, cliente, direccion, horario, domicilio, pagado, abono, total, valorReparto,telefono,                                                        
                                                  detalle_pedidos(id, id_pedido, nombre, tamano, rellenos, foto, detalles, imagen, moldeRedondo )
                                                `)     
                                        .order('horario',{ascending:true})
                                        
        if(!data) {
            return [];
        }
        
        return data

    } catch (error) {

        console.log(error)
        return []

    }

}