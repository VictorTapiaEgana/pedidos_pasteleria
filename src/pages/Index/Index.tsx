import useThemeStore from '../../store/useThemeStore';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CrearPedido from '../CrearPedido/CrearPedido.js';
import Layout from '../Layout.js';
import FinalizarPedido from '../finalizarPedido.js';
import Pedidos from '../Pedidos/Pedidos.js';
import Login from '../Login/Login.js';
import Principal from '../Principal/Principal.js';
import Config from '../Config/Config.js';

const Index = () => {

  const { theme } = useThemeStore()

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
         <BrowserRouter>
              <Routes>
               
                   <Route path='/'  element={ <Login /> } />

                   <Route path='/main' element={ <Layout>
                                                    <Principal />
                                                 </Layout>} />
                    
                    <Route path='/crearpedido' element={ <Layout>
                                                            <CrearPedido />
                                                        </Layout>}
                    />
                    <Route path='/finalizarpedido' element={ <Layout>
                                                                <FinalizarPedido />
                                                            </Layout>}
                    />

                    <Route path='/pedidos' element={<Layout>
                                                       <Pedidos />
                                                    </Layout>}
                    />

                    <Route path='/configuracion' element={ <Layout>
                                                               <Config />
                                                           </Layout>} />
                                                           

              </Routes>
         </BrowserRouter>
    </ThemeProvider> 
  )
}

export default Index