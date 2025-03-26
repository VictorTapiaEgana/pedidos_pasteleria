import { Box, Button, Typography } from "@mui/material" 
import './style.css'
import { useState } from "react"
import CrearProducto from "./CrearProducto/CrearProducto"
import EliminarProducto from "./EliminarProducto/EliminarProducto"


const Config = () => {

    // const [ crear, setCrear ] = useState<boolean>(false)
    // const [ eliminar, setEliminar ] = useState<boolean>(false)
    const [ opcion, setopcion ] = useState<string>('')

    const handleVentanas = (ventana:string) =>{

        setopcion(ventana)
    }

    return(

        <Box sx={{display:'flex',justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <Typography variant="h5" textAlign={'center'} mb={2}>Opciones de productos</Typography> 
            <ul className="listProductos">
                <li>
                    <Button variant="outlined" size="small" color="success" onClick={()=>handleVentanas('Crear')}>  
                        Crear
                    </Button>
                </li>

                <li>
                    <Button variant="outlined" size="small" color="success" onClick={()=>handleVentanas('Eliminar')}>  
                        Eliminar
                    </Button>
                </li>

                {/* <li>
                    <Button variant="outlined" size="small" color="success" onClick={()=>handleVentanas('Actualizar')}>  
                        Actualizar
                    </Button>
                </li>                  */}
            </ul>

            <Box sx={{display:'flex',justifyContent:'center'}}>
                { opcion === 'Crear' && <CrearProducto /> }
                { opcion === 'Eliminar' && <EliminarProducto /> }
            </Box>

        </Box>



    )

  
}

export default Config