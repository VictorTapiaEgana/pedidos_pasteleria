import { sizeType } from "../../type/types";
import { supabase } from "../createConecction";

export default async function getTamanos ():Promise<sizeType[]> {

    const { data } = await supabase.from('tamano')
                                   .select("id, tamano, precio, id_prod") 
    return data as sizeType[];
    
}