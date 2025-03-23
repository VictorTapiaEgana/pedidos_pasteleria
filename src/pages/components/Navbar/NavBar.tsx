import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Chip, MenuItem } from '@mui/material';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useEffect, useState } from 'react';

import useThemeStore from '../../../store/useThemeStore';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {

  const [ dark, setDark ] = useState(false)  
  const { toggleMode, mode  } = useThemeStore()  
  const navigate = useNavigate()

  useEffect(()=>{
    setDark(mode === 'dark');
  },[mode])

  const ListMenu = ['Crear Pedido', 'Pedidos'];

  const HandleClickCrearPedido = (indice:number) =>{

      switch (indice) {
        case 0:
          navigate('/crearpedido')          
          break;
      
        case 1:
          navigate('/pedidos')
          break;
      }
    
  }

  return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                
                <Toolbar>
                    
                    <IconButton size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                    >
                        
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{textDecoration:'none', color:'White'}}>
                            Pedidos Luna
                        </Link> 
                    </Typography>

                    <MenuItem onClick={toggleMode}>
                        {
                          dark  ? <DarkModeIcon/>
                                : <LightModeIcon /> 
                        }
                    </MenuItem>                      

                </Toolbar>
                
      </AppBar>

      <Box sx={{ margin:'30px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexWrap:'wrap'
           }}
      >
           {
            ListMenu.map((menu,index)=>[
                <Chip key={index} 
                      label={menu}
                      variant='outlined' 
                      color='primary'                      
                      onClick={()=>HandleClickCrearPedido(index)}  
                      sx={{marginRight:'10px'}}
                /> 
            ])
           }             
      </Box>

    </Box>
  );
}

export default NavBar;