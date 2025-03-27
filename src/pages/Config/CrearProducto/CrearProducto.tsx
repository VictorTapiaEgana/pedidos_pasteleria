import { Badge, Box, Button, Chip, TextField, Typography } from "@mui/material"
import { useForm, SubmitHandler } from 'react-hook-form'

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import Swal from "sweetalert2";
import saveProductos from "../../../functions/productos/saveProductos";
import { NuevoProducto, Tamano, FormData } from "../../../type/types";
import { useState } from "react";


const CrearProducto = () => {

    const { register, handleSubmit, reset, 
            formState:{errors}, watch, 
            setValue } = useForm<FormData>(
                                          {  defaultValues: {
                                                             taProducto: ''
    }})

    const [ tamanos, setTamanos ] = useState<Tamano[]>([])
    const [ erroTam, setErroTam]  = useState<boolean>(false)

    const AgregarTamanos = (nombre:string,valor:number) =>{        

        setErroTam(false)

        if (nombre && valor){            

            setTamanos(prevTamanos=>[...prevTamanos, { nombre,valor}])
            setValue('taProducto','')
            setValue('pProducto','')

        }else {

            setErroTam(true)

        }
        

    }

    const eliminarBadge = (indice:number) =>{
        

        const newArray:Tamano[] = tamanos.filter((_tam,index)=> index !== indice)        
        setTamanos(newArray)

    }

    const onsubmit:SubmitHandler<FormData> = async(data) =>{

        setErroTam(false)

        if (tamanos.length > 0 ){

            const NewProduct:NuevoProducto = {
                                                tipo:data.tProdcuto,
                                                nombre:data.nProducto,
                                                tamano:data.taProducto,
                                                precio:data.pProducto
            }           

            const resp = await saveProductos(NewProduct,tamanos)

            mostrarAlerta()
            reset()
            return resp
            
        } else {

            setErroTam(true)
        }
        
        

    }

    const mostrarAlerta = () => {
            Swal.fire({
                       title: "¡Éxito!",
                       text: "Producto creado correctamente",
                       icon: "success",
                       confirmButtonText: "Aceptar",
            });
    };

  return (

         <Box sx={{display:'flex',alignItems:'center', justifyContent:'center',flexDirection:'column',width:'360px' }}>

            <Typography variant="h6" mb={1} mt={2} >Productos</Typography>

            <Box sx={{width:'300px'}}>

                <form onSubmit={handleSubmit(onsubmit)} style={{display:'flex', flexDirection:'column', gap:'20px',}}>
                    
                    <TextField variant="outlined" 
                               label='Nombre producto'
                               size="small"
                               error={ !!errors.nProducto } 
                               helperText={ errors.nProducto && String(errors.nProducto?.message) || '' }                            
                               {...register('nProducto', { required: 'Falta nombre' })} 
                    />

                    <TextField variant="outlined"
                               label="Tipo producto"
                               placeholder="Torta, Ciento , Pastel ,Tartaleta u otro"
                               size="small"
                               error={!!errors.tProdcuto }
                               helperText={ errors.tProdcuto && String(errors.tProdcuto?.message) || ''}
                               {...register('tProdcuto',{required:'Falta el tipo'})}
                    />                 

                    <Box>
                            <TextField variant="outlined"
                                       label='Tamaño'
                                       size="small"        
                                       value={watch('taProducto') || ''}                                        
                                       sx={{width:'100px'}}
                                       error={ !!errors.taProducto }
                                       helperText={ errors.taProducto && String(errors.taProducto?.message) || ''}
                                       {...register('taProducto',{pattern: { 
                                                                            value: /^[0-9]+$/, 
                                                                            message: "Solo se permiten números"
                                                                  }}
                                        )}
                                        onInput={(e) => {
                                            const input = e.target as HTMLInputElement; 
                                            input.value = input.value.replace(/\D/g, ""); 
                                     }}
                            />
                              
                            <TextField  variant="outlined"
                                        label='Precio'
                                        size="small"
                                        sx={{width:'100px',marginLeft:'10px'}}
                                        error={!!errors.pProducto}
                                        helperText={errors.pProducto && String(errors.pProducto.message) || ''}
                                        {...register('pProducto')}
                                        onInput={(e) => {
                                            const input = e.target as HTMLInputElement; 
                                            input.value = input.value.replace(/\D/g, ""); 
                                     }}
                            />

                            <Button size="large" sx={{width:'80px',marginLeft:'10px'}} variant="contained" 
                                    onClick={()=>AgregarTamanos(watch('taProducto'),Number(watch('pProducto')))}>
                                <AddBoxOutlinedIcon/>                                
                            </Button>
                            {
                                erroTam && (
                                    <small  style={{color:'tomato'}}>* Tamaño y precio obligatorio</small>
                                )
                            }

                            <Box sx={{margin:'10px',display:'flex',flexWrap:'wrap',flexDirection:"row",
                                      width:'100%',gap:'10px',justifyContent:'center'}}>
                                {
                                    tamanos && tamanos.map((tam,index) =>(
                                        <Badge key={tam.nombre + index + tam.valor} 
                                               badgeContent={'x'} 
                                               color="error" 
                                               onClick={()=>eliminarBadge(index)}>
                                        
                                            <Chip 
                                                label={`${tam.nombre} - ${Number(tam.valor).toLocaleString('es-CL',{style:'currency',currency:'CLP'})}`} 
                                                variant="outlined"
                                                size="small" />                     
                                        </Badge>               
                                    )) 
                                
                                }                                   
                            </Box>

                    </Box>    
                                       

                    <Button type="submit" variant="contained"> Guadar</Button>

                </form>
                
            </Box>

         </Box>
  )

}

export default CrearProducto