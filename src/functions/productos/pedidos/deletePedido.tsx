import { supabase } from "../../createConecction"

export default async function deletePedidi (id_pedido:number){

    try {

        let   data  = await supabase.from('detalle_pedidos')
                                        .delete()
                                        .eq('id_pedido', id_pedido)


        data  = await supabase.from('pedidos')
                                        .delete()
                                        .eq('id', id_pedido)

        return data
        
    } catch (error) {

        console.log(error)
        return[]        
    }

}