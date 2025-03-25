import { Usuario } from './../type/types';
import { supabase } from "./createConecction"

export default async function getUsers( usuario:Usuario ){

    try {
        
        const { data } = await supabase.from('users')
                                       .select()
                                       .eq('nombre',usuario.nombre) 

        if (!data) { return []}

        return data

    } catch (error) {

        console.log(error)
        return []
        
    }

}