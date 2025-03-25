import {  Grid2 } from "@mui/material"
import { useEffect, useState } from "react";
import getPedidos from "../../functions/productos/pedidos/getPedidos";
import { getPedido } from "../../type/types";
import CalendarDay from "../components/CalendarDay/CalendarDay";
import { useNavigate } from "react-router-dom";
import useUser from "../../store/useUsers";

const Pedidos = () => {

    const [ pedidos, setPedidos ] = useState<getPedido[]>([])

    const navigate = useNavigate()    
    
    const { UsuarioStr } = useUser() as { UsuarioStr: boolean };    
      
     useEffect(()=>{
        if(!UsuarioStr) { navigate('/') }
        
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])


    async function fetchPedidos() {

        const resp = await getPedidos()
        setPedidos(resp)
    }

    useEffect (()=>{

        fetchPedidos()
    
    },[])

    return (

        <Grid2 container spacing={2} sx={{ display:'flex', 
                                           justifyContent:'flex-start', 
                                           alignItems:'end',
                                           margin:{xs:'0px 20px',sm:'0 50px',md:'0 100px'}}}>            

            <CalendarDay listaPedidos = { pedidos }
                         fetchPedidos = { fetchPedidos }    />
                    
        </Grid2>

      );

    };

export default Pedidos