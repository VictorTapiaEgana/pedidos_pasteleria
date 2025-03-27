import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ProductoConTamanos } from "../../../type/types"
import getProductos from "../../../functions/productos/getProductos"

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Swal from "sweetalert2";
import deleteProductos from "../../../functions/productos/deleteProductos";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


const EliminarProducto = () => {

    const [ productos, setProductos ] = useState<ProductoConTamanos[]>([]) 

    const fetchProductos = async () =>{

        const resp = await getProductos()
        setProductos(resp)
    }

    useEffect(()=>{ fetchProductos() },[])

    const handleEliminarProdcuto = (id_producto:number) =>{

          Swal.fire({
                           title: "Quiere eliminar este producto?",
                           showDenyButton: true,
                           showCancelButton: true,
                           showConfirmButton:false,
                           icon:"question",
                           // confirmButtonText: "Elimiar",
                           denyButtonText: `Eliminar`
                 }).then( async (result) => {
                   
                   if (result.isDenied) {
         
                       const data = await deleteProductos(id_producto) 
         
                       fetchProductos()
         
                       Swal.fire("Producto Eliminado", "", "info");
                       
                       return data          
                                     
                   }
          });

    }

  return (

        <Box sx={{display:'flex',alignItems:'center', flexDirection:'column',width:'100%',height:'100vh'}}>

            <Typography variant="h6" mt={2} mb={1}> Eliminar</Typography>

            <table style={{borderCollapse:'collapse',margin:'10px'}}>

                <tbody>

                    <tr>
                        <th style={{border:'1px #a8216c solid'}}>Nombre</th>
                        <th style={{border:'1px #a8216c solid'}}>Tipo</th>
                        <th style={{border:'1px #a8216c solid'}}>Tamaños</th>
                        <th style={{border:'1px #a8216c solid'}}><SettingsOutlinedIcon sx={{position:'relative',top:'3px'}}/></th>
                    </tr>                   
                        {
                            productos && productos.map((prod)=>(
                                <tr key={prod.nombre + prod.id}>
                                    <td style={{width:'140px'}}>{ prod.nombre } </td>
                                    <td>{ prod.tipo }</td>
                                    <td>
                                        {
                                            prod.tamanos && prod.tamanos.map((tam)=>(
                                               `${tam.tamano} -`
                                            )).join('').slice(0, -2)
                                        }

                                    </td>
                                    <td onClick={()=> handleEliminarProdcuto(prod.id)}>
                                       <DeleteForeverOutlinedIcon color="error" sx={{cursor:'pointer'}}/>     
                                    </td>
                                </tr>
                            ))
                        }                    

                </tbody>

            </table>


        </Box>
  )
}

export default EliminarProducto