import { rellenosType } from "../../type/types";
import { supabase } from "../createConecction"

export default async function getRellenos():Promise<rellenosType[]>{

    const { data } = await supabase.from('rellenos')
                                   .select('id, nombre')

    return data as rellenosType[];

}