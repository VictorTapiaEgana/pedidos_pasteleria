import {  finalizarPedido, guadarPedidos } from "../../../type/types";
import { supabase } from "../../createConecction";

export default async function savePedidos ( pedido:guadarPedidos[], detallePedido:finalizarPedido ) {

  console.log(pedido)
      try {
          const { data } = await supabase.from('pedidos')
                                         .insert(
                                              {
                                                fecha: pedido[0].fecha,
                                                cliente: detallePedido.nombre,                               
                                                direccion:detallePedido.direccion,
                                                horario: detallePedido.horario ,
                                                domicilio:detallePedido.areparto,
                                                pagado:0,
                                                abono:Number(detallePedido.abono),
                                                total:Number(detallePedido.total), 
                                                valorReparto:Number(detallePedido.valorReparto)
                                              })
                                        .select()        
                                              console.log(data)
          const ultimoID =  data?.[0]?.id     
          console.log("Utimo_id : ", ultimoID)
          
          const detallesPromesas = pedido.map((ped) =>
                                   supabase.from("detalle_pedidos").insert({
                                                                            id_pedido: ultimoID,
                                                                            nombre: ped.producto,
                                                                            tamano: ped.tamano,
                                                                            rellenos: ped.relleno,
                                                                            foto: ped.fotoTorta,
                                                                            detalles: ped.detalle,
                                                                            imagen: ped.nombreFoto,
                                                                            moldeRedondo:ped.moldeRedondo
                                  })
          );
  
          const detallesResultados = await Promise.all(detallesPromesas);

          return detallesResultados

      } catch ( error){

        console.log(error)
        return []
        
      }
    
    
}



    // pedido.forEach(async(ped)=>{
    //       await supabase.from('detalle_pedidos')
    //                     .insert(
    //                             {
    //                               id_pedido:ultimoID,
    //                               nombre:ped.producto,
    //                               tamano:ped.tamano,
    //                               rellenos:ped.relleno,
    //                               foto:ped.fotoTorta,
    //                               detalles:ped.detalle,
    //                               imagen:ped.nombreFoto
    //                             })                                          
    // })