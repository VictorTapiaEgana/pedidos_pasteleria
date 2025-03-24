import { useEffect, useState } from "react";

import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid2, InputLabel, MenuItem, Select, TextField, Typography, SelectChangeEvent, Card, CardContent, FormLabel, RadioGroup, Radio } from "@mui/material"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es"; 

import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CropDinIcon from '@mui/icons-material/CropDin';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

import { guadarPedidos, ProductoConTamanos, rellenosType } from "../../type/types";

import getProductos from "../../functions/productos/getProductos";
import getRellenos from "../../functions/productos/getRellenos";

import './CrearPedido.css'
import useCartStore from "../../store/useCartStore";
import { useNavigate } from "react-router-dom";

const CrearPedido = () => {

    const [ selectDate, setSelectDate ] =useState<Dayjs | null>(dayjs());
    const [ productos, setProductos ] = useState<ProductoConTamanos[]>([])    
    const [ prodSel, setProdSel ] = useState<string>('')
    const [ chipsProductos, setChipsProductos ] = useState<ProductoConTamanos>()
    const [ selTamano, setSelTamano ] = useState<number>(0)

    const [ rellenos, setRellenos ] = useState<rellenosType[]>([])
    const [ selRelleno , setSelRelleno ] = useState<string>('')
    const [ showRellenos, setshowRellenos ] = useState<boolean>(false)
    const [ rellenoEspecial , setRellenoEspecial ] = useState<boolean>(false)

    const { setCarrito } = useCartStore()
    const navigate = useNavigate()
    
    const [ fotoTorta, setFotoTorta ] = useState<boolean>(false)
    const [ detalles , setDetalles ] = useState<string>('')
    const [ productoPedido, setProductosPedido ] = useState<guadarPedidos[]>([])
    const [ nombreFoto, setNombreFoto ] = useState<string>('')
    const [ erroresForm, setErroresForm ] = useState<string[]>([])
    const [ moldeRedondo, setMoldeRedondo ] = useState<boolean>(true)
    const [ totalPedido, setTotalPedido ] = useState<number>(0)

    async function fetchRellenos(){
        const data = await getRellenos()
        setRellenos(data)
    }

    async function fetchProductos() {      
        const data = await getProductos()           
        setProductos(data)           
    }
    
    useEffect(() => {        
        const tieneEspecial = rellenos?.filter(relle => relle.nombre === selRelleno)[0]?.especial;
        setRellenoEspecial(tieneEspecial);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selRelleno]);

    
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
            return 

        }                              
       
        const precio = prod[0].tamanos.filter((tam)=> Number(tam.tamano) === Number(selTamano))    
        
        //Relleno especial
        let Total = 0;
        if (rellenoEspecial){
            Total += 3000
        }

        if(fotoTorta){
            Total+= 2000
        }

        const detallePedido ={                            
                              fecha: selectDate ? selectDate.toDate() : new Date(),
                              producto:String(prodSel),
                              tamano:Number(selTamano),
                              relleno:String(selRelleno) ,
                              fotoTorta:fotoTorta,
                              nombreFoto:nombreFoto,
                              precio: String( Number(precio[0].precio) + Total),
                              detalle:String(detalles),
                              moldeRedondo:moldeRedondo,
                              rellenoEspecial:rellenoEspecial
        }
    
        setProductosPedido(prevProductoPedido => [...prevProductoPedido , detallePedido])              
        setTotalPedido(prevPedido =>(Number(prevPedido) + Number(detallePedido.precio)))   

        const nuevoCarrito = [...productoPedido, detallePedido];
        // Guardar en Zustand con el array actualizado
        setCarrito(nuevoCarrito);    

        LimpiarEstados()        
    }

    const handleClickDelete = (id_delete:number) =>{

        const newArray = productoPedido.filter((_prod,index) => index !== id_delete)        
        setProductosPedido(newArray)               

        const newTtotal = newArray.reduce((count,ped)=> count + Number(ped.precio),0 )

        setTotalPedido(Number(newTtotal))   

        setCarrito(newArray)

        LimpiarEstados()
    }

    const LimpiarEstados = () =>{

          setProdSel('')
          setDetalles('')
          setFotoTorta(false)
          setSelRelleno('')
          setSelTamano(0)
          setNombreFoto('')
          setChipsProductos(undefined)
          setshowRellenos(false)

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

                                <FormControl sx={{marginTop:'10px'}}>
                                    <FormLabel id="demo-radio-buttons-group-label" sx={{textAlign:'center'}}>
                                        Tipo molde
                                    </FormLabel>

                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="Redondo"
                                        name="radio-buttons-group"
                                        sx={{ display:'flex', flexDirection:'row'}}
                                    >
                                        <FormControlLabel value="Redondo" 
                                                           control={<Radio 
                                                                         onChange={()=>setMoldeRedondo(true)}
                                                            />}  
                                                            label="Redondo"
                                        />

                                        <FormControlLabel value="Cuadrado" 
                                                          control={<Radio 
                                                                        onChange={()=>setMoldeRedondo(false)}
                                                          />} 
                                                          label="Cuadrado" 
                                        />

                                    </RadioGroup>
                                </FormControl>

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
                                                        sx={{ justifyContent: 'space-between',
                                                              backgroundColor: relle.especial == true ? 'lightyellow' : 'transparent',
                                                        }}
                                                    >                                                     
                                                    { relle.especial && '🌟 ' }
                                                    { relle.nombre }
        
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
                            totalPedido > 0 && (
                                <h2 style={{fontWeight:'800', fontSize:'20px', width:'300', textAlign:'center'}}> 
                                    Total Pedido { Number(totalPedido).toLocaleString('es-CL',{style:'currency',currency:"CLP"}) }
                                </h2>
                             )
                       }

                       {
                        productoPedido.length > 0 && productoPedido.map((ped,index)=>(
                            <Card key={ ped.producto + index } sx={{ maxWidth:'300px' , marginTop:'15px'}} >
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

                                                {ped.rellenoEspecial ? '🌟 ' : ''}
                                                {ped.relleno}
                                            
                                        </Typography>
                                       ) 
                                    }
                                    
                                    <Box sx={{ color: 'text.secondary', mb: 1.5 }}>
                                        <GroupOutlinedIcon sx={{position:'relative',top:'5px'}}/> { ped.tamano}                                        
                                    </Box>

                                    <Box sx={{display:'flex', 
                                              justifyContent:'flex-start', 
                                              gap:'5px',
                                              marginBottom:'10px', 
                                              color: 'text.secondary'
                                            }}
                                    >
                                        {
                                            ped.moldeRedondo 
                                                            ? <> <PanoramaFishEyeIcon/> Redonda </>                                                                    
                                                            : <> <CropDinIcon/> Cuadrada </>
                                        }

                                    </Box>
                                    {
                                        ped.fotoTorta && (
                                            <Box sx={{ display:'flex', 
                                                       justifyContent:'flex-start', 
                                                       gap:'5px',                                                
                                                       color: 'text.secondary'
                                              }}
                                            >
                                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>                                        
                                                    <ImageOutlinedIcon sx={{position:'relative',top:'5px'}} /> {ped.nombreFoto}
                                                </Typography>
                                            </Box>
                                        )
                                    }
                                    {
                                        ped.detalle && (
                                            <Box sx={{ display:'flex', 
                                                       justifyContent:'flex-start', 
                                                       gap:'5px',                                                    
                                                       color: 'text.secondary'
                                              }}
                                      >
                                                <Typography sx={{ color: 'text.secondary' }}>                                       
                                                    <DescriptionOutlinedIcon sx={{position:'relative',top:'5px'}}/> { ped.detalle } 
                                                </Typography> 
                                            </Box>
                                        )
                                    }

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
                      
                      <Button variant="contained" 
                              sx={{marginBottom:'20px', display:'flex',gap:'8px', width:'250px'}}
                              onClick={()=>navigate('/finalizarpedido')}
                      >
                          Finalizar Pedido 
                          <CheckBoxOutlinedIcon/>
                      </Button>
                      
                </Box>

            </Box>
            
  )

}

export default CrearPedido