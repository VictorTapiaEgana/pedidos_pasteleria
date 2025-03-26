import { NuevoProducto, Tamano } from "../../type/types"
import { supabase } from "../createConecction"

export default async function saveProductos(NewProduct:NuevoProducto,tamanos:Tamano[]){    

    try {

        const  { data }  = await supabase.from('productos')
                                         .insert({'tipo':NewProduct.tipo ,'nombre':NewProduct.nombre})
                                         .select()

        if(!data){ return []}

        const [newID]  = data        

        const dat = tamanos.map(async(tam) =>  await supabase.from('tamano')
                                                             .insert({ 'tamano':tam.nombre,
                                                                       'precio':tam.valor,
                                                                       'id_prod':newID.id})) 
 
       return dat;
       
    } catch (error) {

        console.log(error)
        return []
        
    }
    
}