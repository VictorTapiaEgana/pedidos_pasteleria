import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ProductoConTamanos } from "../../../type/types"
import getProductos from "../../../functions/productos/getProductos"


const EliminarProducto = () => {

    const [ productos, setProductos ] = useState<ProductoConTamanos[]>([]) 

    const fetchProductos = async () =>{

        const resp = await getProductos()
        setProductos(resp)
    }

    useEffect(()=>{ fetchProductos() },[])

  return (

        <Box sx={{display:'flex',alignItems:'center', flexDirection:'column',width:'100%',height:'100vh'}}>

            <Typography variant="h6" mt={2} mb={1}> Eliminar</Typography>


        </Box>
  )
}

export default EliminarProducto