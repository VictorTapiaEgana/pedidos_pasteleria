import { Box } from "@mui/material"
import useUser from "../../store/useUsers"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Principal = () => {   

  const navigate = useNavigate()

  const { UsuarioStr } = useUser()

  useEffect(()=>{
    
        if(!UsuarioStr) { navigate('/') }
        
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (

        <Box> 
          
            
    
        </Box>
  )
  
}

export default Principal
