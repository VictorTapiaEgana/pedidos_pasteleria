import { Box } from "@mui/material"
import NavBar from "./components/Navbar/NavBar"


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
         
    <Box>
        <NavBar />
        { children }
    </Box>
    
  )
}

export default Layout