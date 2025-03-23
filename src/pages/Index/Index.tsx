import useThemeStore from '../../store/useThemeStore';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from '../Principal/Principal.js';
import CrearPedido from '../CrearPedido/CrearPedido.js';
import Layout from '../Layout.js';
import FinalizarPedido from '../finalizarPedido.js';

const Index = () => {

  const { theme } = useThemeStore()

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
         <BrowserRouter>
              <Routes>
                   <Route path='/'  element={ <Layout> 
                                                  <Principal/> 
                                             </Layout> } 
                    />
                    <Route path='/crearpedido' element={ <Layout>
                                                            <CrearPedido />
                                                        </Layout>}
                    />
                    <Route path='/finalizarpedido' element={ <Layout>
                                                                <FinalizarPedido />
                                                            </Layout>}
                    />
              </Routes>
         </BrowserRouter>
    </ThemeProvider> 
  )
}

export default Index