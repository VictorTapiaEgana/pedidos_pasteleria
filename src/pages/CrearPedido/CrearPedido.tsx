import { useEffect, useState } from "react";

import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid2, InputLabel, MenuItem, Select, TextField, Typography, SelectChangeEvent, Card, CardContent } from "@mui/material"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es"; 

import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import { guadarPedidos, ProductoConTamanos, rellenosType } from "../../type/types";

import getProductos from "../../functions/productos/getProductos";
import getRellenos from "../../functions/productos/getRellenos";

import './CrearPedido.css'

const CrearPedido = () => {

    const [ selectDate, setSelectDate ] =useState<Dayjs | null>(dayjs());
    const [ productos, setProductos ] = useState<ProductoConTamanos[]>([])    
    const [ prodSel, setProdSel ] = useState<string>('')
    const [ chipsProductos, setChipsProductos ] = useState<ProductoConTamanos>()
    const [ selTamano, setSelTamano ] = useState<number>(0)
    const [ rellenos, setRellenos ] = useState<rellenosType[]>([])
    const [ selRelleno , setSelRelleno ] = useState<string>('')
    const [ showRellenos, setshowRellenos ] = useState<boolean>(false)
    const [ fotoTorta, setFotoTorta ] = useState<boolean>(false)
    const [ detalles , setDetalles ] = useState<string>('')
    const [ productoPedido, setProductosPedido ] = useState<guadarPedidos[]>([])
    const [ nombreFoto, setNombreFoto ] = useState<string>('')
    const [ erroresForm, setErroresForm ] = useState<string[]>([])

    async function fetchRellenos(){
        const data = await getRellenos()
        setRellenos(data)
    }

    async function fetchProductos() {      
        const data = await getProductos()           
        setProductos(data)           
    }

    useEffect(()=>{
        fetchProductos()                
        fetchRellenos()
    },[])
    
   
    const handleSelectChange = (event: SelectChangeEvent) => {

        const selectedId = event.target.value;              

        LimpiarEstados()            
        
        setProdSel(selectedId);
        setshowRellenos(false)

        const selectedProducto = productos.find((producto) => producto.nombre === String(selectedId));
        setChipsProductos(selectedProducto)        

        if (selectedProducto?.tipo === 'Torta'){
            setshowRellenos(true)
        }
        
    };

    const handleClickAddPedido = () =>{               
       
        const erroresTemp = [];
        setErroresForm([])

        const prod = productos?.filter((pro)=> pro.nombre === prodSel)        
        

        if (!selectDate) { erroresTemp.push('Fecha inválida ') }

        if (!prodSel) { erroresTemp.push('Seleccione un producto ') }

        if (selTamano < 1) { erroresTemp.push('Seleccione un tamaño') }

        if (fotoTorta){ 
            if (nombreFoto === ''){ erroresTemp.push('Falta Nombre para la imagen')} 
        }

        if (prod.length > 0 && prod[0].tipo === "Torta"){
            if(!selRelleno){
                erroresTemp.push('Seleccione un relleno');
            }
        }

        if (erroresTemp.length >= 1) { 
            setErroresForm([...erroresTemp])
            // console.log(erroresTemp)
            return 
        }               
        
        const precio = prod[0].tamanos.filter((tam)=> Number(tam.tamano) === Number(selTamano))    

        const detallePedido ={
                              fecha: selectDate ? selectDate.toISOString() : "", 
                              producto:String(prodSel),
                              tamano:Number(selTamano),
                              relleno:String(selRelleno) ,
                              fotoTorta:fotoTorta,
                              nombreFoto:nombreFoto,
                              precio: String(precio[0].precio),
                              detalle:String(detalles)
        }
    
        setProductosPedido(prevProductoPedido => [...prevProductoPedido , detallePedido])

        LimpiarEstados()        
    }

    const handleClickDelete = (id_delete:number) =>{

        const newArray = productoPedido.filter((_prod,index) => index !== id_delete)
        setProductosPedido(newArray)        
    }

    const LimpiarEstados = () =>{

          setProdSel('')
          setDetalles('')
          setFotoTorta(false)
          setSelRelleno('')
          setSelTamano(0)
          setNombreFoto('')
          setChipsProductos(undefined)

    }

    return (
            <Box mt={3} sx={{ display:'flex',
                              justifyContent:'center',
                              alignItems:'center',
                              flexDirection:'column',
                              gap:'10px'
            }} >

                 <Grid2>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">                    
                            <DatePicker label="Fecha"
                                        format="DD/MM/YYYY"
                                        value={selectDate}
                                        sx={{width:'300px'}}   
                                        onChange={(newValue) => setSelectDate(newValue)}       
                                        localeText={{
                                            cancelButtonLabel: "Cancelar",
                                            okButtonLabel: "Aceptar",
                                            toolbarTitle: "Selecciona una fecha",
                                            todayButtonLabel: "Hoy",
                                        }}                              
                                />                        
                        </LocalizationProvider>                              
                 </Grid2> 
            
                 <Grid2 mt={2}>
                      <FormControl fullWidth>
                            <InputLabel id="selectProd" sx={{top:'0px'}}>Producto</InputLabel>
                            <Select 
                                   labelId="selectProd"
                                   sx={{ width: '300px' }} 
                                   label="Producto" 
                                   value={prodSel} 
                                   onChange={handleSelectChange}
                                >
                                    {productos && productos.map((producto) => (
                                        <MenuItem 
                                            key={producto.id}  
                                            value={producto.nombre}  
                                            sx={{ justifyContent: 'space-between' }}
                                        >
                                            {producto.nombre} 

                                        </MenuItem>
                                    ))}
                                </Select>                     

                      </FormControl>                       
                 </Grid2>     

                 <Grid2>
                        { 
                            chipsProductos && (                    
                                <Typography>Tamaños </Typography>
                            )

                        }
                    <Box mt={1} sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center',gap:'30px'}}>   
                        {
                            chipsProductos?.tamanos.map((chip)=>(                                
                                <Chip 
                                    key={chip.precio + chip.tamano}                                     
                                    label={ chip.tamano }        
                                    color={Number(selTamano) === Number(chip.tamano) ? 'primary' : 'success'}   
                                    size="medium"                                       
                                    onClick={()=>setSelTamano(Number(chip.tamano))}
                                />                          
                            ))                        
                        }
                    </Box>  
                 </Grid2> 

                {
                    showRellenos && (
                      <Grid2  container spacing={2}>   
                            <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                                <FormControl fullWidth>

                                        <InputLabel id="selectRelleno" sx={{top:'0px'}}>Rellenos</InputLabel>
                                        <Select 
                                            labelId="selectRelleno"
                                            sx={{ width: '300px' }} 
                                            label="Rellenos" 
                                            value={selRelleno}                                         
                                            onChange={(e)=>setSelRelleno(e.target.value)}                                        
                                            >
                                                {rellenos && rellenos.map((relle) => (
                                                    <MenuItem 
                                                        key={relle.id}  
                                                        value={relle.nombre}  
                                                        sx={{ justifyContent: 'space-between' }}
                                                    >
                                                        {relle.nombre} 
        
                                                    </MenuItem>
                                                ))}
                                            </Select>                     
        
                                </FormControl>

                                <FormControlLabel
                                        control={
                                                <Checkbox checked={fotoTorta} 
                                                          onClick={()=>setFotoTorta(!fotoTorta)} />
                                               }
                                        label="Foto Torta"
                                />
                                {
                                    fotoTorta && (
                                        <TextField variant="outlined" 
                                                   sx={{width:'300px'}}
                                                   value={nombreFoto}
                                                   label='Nombre imagen'
                                                   onChange={(e)=>setNombreFoto(e.target.value)}
                                                   />
                                    )
                                }

                        </Box>  
                      </Grid2>  
                    )
                }            

                <TextField size="medium" 
                           multiline={true}     
                           label='Detalles . . .'   
                           value={detalles}                   
                           onChange={(e)=>setDetalles(e.target.value)}
                           sx={{
                                width:'300px',                      
                                marginBottom:'10px'          
                           }}>
                </TextField> 

                <Box>
                    {
                        erroresForm.length > 0 && erroresForm.map((err, index)=>(
                                <ul key={index} style={{ listStyle:'none' }}>
                                    <li style={{ backgroundColor:'tomato', 
                                                 color:'white', 
                                                 fontWeight:'800',
                                                 position:'relative',
                                                 left:'-15px', 
                                                 padding:'5px',
                                                 borderRadius:'10px' 
                                              }}
                                    > 
                                        {index +1}-. {err} 
                                    </li>
                                </ul>                            
                        ))
                    }
                </Box>

                <Button variant="contained" color="success" sx={{ display:'flex',gap:'8px', width:'250px' }} onClick={handleClickAddPedido}>
                    <AddCircleOutlineOutlinedIcon />
                    Agregar Producto
                </Button>

                <Box>
                       {
                        productoPedido.length > 0 && productoPedido.map((ped,index)=>(
                            <Card key={ ped.producto + index } sx={{ minWidth: 300 , marginTop:'15px'}} >
                                <CardContent>                                   
                                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                        <Typography variant="h5" component="div">
                                            { ped.producto}
                                        </Typography>
                                        <Button>
                                            <DeleteForeverOutlinedIcon onClick={()=>handleClickDelete(index)}/>
                                        </Button>
                                    </Box>   
                                    
                                    {
                                       ped.relleno && (
                                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                            { ped.relleno}                                             
                                        </Typography>
                                       ) 
                                    }
                                    
                                    <Box sx={{ color: 'text.secondary', mb: 1.5 }}>
                                        <GroupOutlinedIcon sx={{position:'relative',top:'5px'}}/> { ped.tamano}                                        
                                    </Box>

                                    {
                                        ped.fotoTorta && (
                                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>                                        
                                                { ped.fotoTorta && 'Con imagen de: ' } 
                                                <br/>
                                                "{ped.nombreFoto}"
                                            </Typography>
                                        )
                                    }

                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>                                       
                                        { ped.detalle }
                                    </Typography> 
                                    <Box sx={{ display:'flex', justifyContent:'end', fontSize:'18px', fontWeight:'800'}}>
                                        { Number(ped.precio).toLocaleString("es-CL",{style:"currency", currency:"CLP"}) }
                                    </Box>

                                </CardContent>
                                
                            </Card>
                        ))                           
                       }    
                </Box>

                <Box mt={2} sx={{
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                flexDirection:'column',
                                gap:'15px'
                            }}
                >
                      
                      <Button variant="contained" sx={{marginBottom:'20px', display:'flex',gap:'8px', width:'250px'}}>
                          Finalizar Pedido 
                          <CheckBoxOutlinedIcon/>
                      </Button>
                      
                </Box>

            </Box>
            
  )

}

export default CrearPedido

