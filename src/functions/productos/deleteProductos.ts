import { supabase } from "../createConecction"

export default async function deleteProductos(id_prod:number){

    try {

        const { data } = await supabase.from('tamano')
                                        .delete()
                                        .eq('id_prod',id_prod)

        const datos = await supabase.from('productos')
                                        .delete()
                                        .eq('id',id_prod)
                                        
                    

        console.log(datos)
        return data                                          
        
    } catch (error) {

        console.log(error)
        return[]
        
    }
}