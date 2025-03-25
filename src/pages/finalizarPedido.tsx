import { useEffect, useState } from "react";
import  Swal  from 'sweetalert2'
import useCartStore from "../store/useCartStore";
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Button } from "@mui/material";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import savePedidos from "../functions/productos/pedidos/savePedidos";

const FinalizarPedido = () =>{

    const { Carrito } = useCartStore()

    const [ aReparto, setaReparto ] = useState<boolean>(true)
    const [ nombre, setNombre ] = useState<string>('')
    const [ telefono, setTelefono ]= useState<string>('')
    const [ horario, setHorario ] = useState<string>('')
    const [ direccion, setDireccion ] = useState<string>('')
    const [ valorReparto, setValorReparto ] = useState<string>('')

    const [ ErrorList, setErrorList ]= useState<string[]>([])

    const [ total, setTotal ] = useState<number>(0)
    const [ abono, setAbono ] = useState<string>('')
    const [ totalNuevo, setTotalNuevo ] = useState<number>(0)
    
    useEffect(()=>{

        const TotalPedido = Carrito.reduce((total,prod)=>Number(total) + Number(prod.precio),0)        
        setTotal(Number(TotalPedido))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


        const mostrarAlerta = () => {
            Swal.fire({
                        title: "¡Éxito!",
                        text: "Tu pedido ha sido creado correctamente.",
                        icon: "success",
                        confirmButtonText: "Aceptar",
            });
      };
    
    
    
    const handleClickFinalizar = async () =>{

        const Errores:string[] = []
        setErrorList([])

        if (!nombre) { Errores.push ('Ingrese Nombre') }
        if (!horario) { Errores.push ('Ingrese Horario')}

        if (Errores.length > 0) { 
            
            setErrorList(Errores)
            return 
        }

        const detallefinal = {
              nombre:String(nombre),
              telefono:String(telefono),
              horario:String(horario),
              areparto:aReparto,
              direccion:String(direccion),
              valorReparto:String(valorReparto),
              abono:String(abono),
              total:String(total)  
        }

        //Guardar los datos

        const resp = await savePedidos(Carrito,detallefinal)
        mostrarAlerta()
        
        LimpiarCmapos()

        return resp

    }

    const handleClickActualizarPrecio = () =>{
        let newTotal = total;

        newTotal += Number(valorReparto)

        newTotal -= Number(abono);

        setTotalNuevo(newTotal)
        
    }

    const LimpiarCmapos = () =>{

        setaReparto(false)   
        setNombre('')
        setTelefono('')
        setHorario('')
        setDireccion('')
        setValorReparto('')
        setErrorList([])
        setTotal(0)
        setAbono('')
        setTotalNuevo(0)

    }

      return(
            <Box textAlign={'center'} sx={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>

                 <Typography variant="h5"> Finalizar pedido </Typography>   

                 <TextField sx={{margin:'10px', width:'300px'}}                             
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}
                            label='Nombre' />                 

                <TextField sx={{margin:'10px', width:'300px'}}
                            value={telefono}                                 
                            onChange={(e)=>setTelefono(e.target.value)}
                            label='Telefono' /> 

                <TextField sx={{margin:'10px', width:'300px'}}     
                           value={horario} 
                           onChange={(e)=>setHorario(e.target.value)}
                           label='Horario entrega'/>

                 <FormControl>
                    
                    <RadioGroup defaultValue="Reparto"
                                name="radio-buttons-group"                             
                                sx={{display:'flex', flexDirection:'column',marginBottom:'15px'}}>

                        <FormControlLabel value="Reparto" 
                                          control={<Radio />} 
                                          label="Reparto" 
                                          onChange={()=>setaReparto(true)}/>

                        <FormControlLabel value="Retiro" 
                                          control={<Radio />}                                           
                                          label="Retiro en local" 
                                          onChange={()=>setaReparto(false)}/>

                    </RadioGroup>

                 </FormControl>

                    { 
                        aReparto &&  (

                            <Box sx={{display:'flex', flexDirection:'column'}}>
                                 <TextField sx={{margin:'10px', width:'300px'}} 
                                            value={direccion}
                                            onChange={(e)=>setDireccion(e.target.value)}
                                            label='Direccion' />                                 
                            
                                 
                                 <TextField sx={{margin:'10px', width:'300px',
                                                " & input": {
                                                        textAlign:'right'
                                                }}}                                  
                                            value={valorReparto}
                                            onChange={(e)=>setValorReparto(e.target.value)}
                                            label='Valor reparto' />                                 
                               
                            </Box>

                        ) 
                    }
                        <Box>

                            <Typography variant="h5" sx={{fontWeight:'800',marginBottom:'10px'}}>
                                TOTAL : { total.toLocaleString('es-CL',{style:'currency',currency:'CLP'}) }
                            </Typography>

                            <TextField label='Abono'   
                                       value={abono}                                                                           
                                       onChange={(e)=>setAbono(e.target.value)}                                       
                                       sx={{marginBottom:'10px',
                                        "& input": {
                                                textAlign: "right"                                          
                                        }}}/>
                                       

                            <Button sx={{position:'relative',height:'55px', marginLeft:'5px'}}
                                    variant="contained"
                                    onClick={handleClickActualizarPrecio}>
                                <AutorenewOutlinedIcon />
                            </Button>           

                            <Typography variant="h5" sx={{fontWeight:'800'}}>
                                SALDO : { totalNuevo.toLocaleString('es-CL',{style:'currency',currency:'CLP'}) }
                            </Typography>

                        </Box>                     

                    {
                        ErrorList.length > 0 && (
                            <ul style={{listStyle:'none',position:'relative',marginLeft:'-50px'}}>
                                { 
                                    ErrorList.map(( erro, index ) => (
                                        <li key={index}
                                            style={{color:'tomato', fontWeight:'800'}}>
                                            * {erro}
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }

                    <Box>
                        <Button color="success" variant="contained" sx={{width:'300px',marginTop:'20px'}} onClick={handleClickFinalizar}>
                            Finalizar Pedido
                        </Button>
                    </Box>
            </Box>
      )
    

}

export default FinalizarPedido;