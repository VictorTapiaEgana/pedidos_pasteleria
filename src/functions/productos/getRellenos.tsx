import { rellenosType } from "../../type/types";
import { supabase } from "../createConecction"

export default async function getRellenos():Promise<rellenosType[]>{

    const { data } = await supabase.from('rellenos')
                                   .select('id, nombre, especial, valor')
                                   .order('nombre' ,{ascending:true})

    return data as rellenosType[];

}