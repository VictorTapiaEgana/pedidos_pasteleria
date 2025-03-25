import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { Usuario } from "../../type/types"
import getUsers from "../../functions/getUsers"
import { useNavigate } from "react-router-dom"
import useUser  from "../../store/useUsers"

const Login = () => {

    const [ usuario, setUsuario ] = useState<string>('')
    const [ constrasena, setContrasena] =  useState<string>('')
    const [ errores, setErrores ] = useState<boolean>(false)

    const navigate = useNavigate()
    const { setUsuarioStr } = useUser() 
    
    const handleclickIngresar = async() =>{

        const newUser:Usuario = { nombre: usuario, contrasena: constrasena }
        
        

        setErrores(false)

        try {

            const resp = await getUsers (newUser)

            if ( resp.length < 1 ){ 
                setErrores(true)                
                return
            }

            if( resp[0].password === constrasena ){
                setErrores(false)
                setUsuarioStr(true)
                navigate('/main')
            } else {
                setErrores(true)
            }          
            
        } catch (error) {

            console.log(error)            
            
        }
        
    }

  return (

         <Box sx={{ display:'flex',
                    justifyContent:'center',
                    alignItems:'center', 
                    flexDirection:'column',
                    height:'100vh',
                    width:'100vw' }}>  
         

                <img src="/logo.png" 
                    alt="logo pasteleria luna" 
                    width={150}
                    style={{backgroundColor:'White',
                            borderRadius:'100%'}} />

                {
                    errores && (
                        <label style={{marginTop:'10px', textAlign:'center'}}>Nombre o <br/> Contraseña <br/>incorrectas</label>
                    )
                }
                

               <Box sx={{display:'flex',flexDirection:'column',gap:'10px'}} mt={4}>
                     <TextField variant="outlined" label='Nombre' size="small" value={usuario} onChange={(e)=>setUsuario(e.target.value)}/>
                     <TextField variant="outlined" label='Contraseña' size="small" type="password" value={constrasena} onChange={(e)=>setContrasena(e.target.value)}/>
                     <Button fullWidth variant="contained" onClick={handleclickIngresar}>Ingresar</Button> 
               </Box>

         </Box>
  )

}

export default Login