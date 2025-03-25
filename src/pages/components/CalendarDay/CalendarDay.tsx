import { useEffect, useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import { DateClickArg } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid"; 
import esLocale from "@fullcalendar/core/locales/es";

import { Box, Button } from '@mui/material'

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

import './CalendarDay.css'
import { CalendarDayProps, CalendarEvent, DetalleProd} from "../../../type/types";
import deletePedidi from "../../../functions/productos/pedidos/deletePedido";
import Swal from "sweetalert2";



export default function CalendarDay({ listaPedidos,fetchPedidos }:CalendarDayProps ) {

    const calendarRef =useRef<FullCalendar | null>(null);  
    const [ currentView, setCurrentView]  = useState('dayGridMonth');  
    const [ eventList, setEventList ] = useState<CalendarEvent[]>([])    

    useEffect(()=>{

      const NewArray = listaPedidos.map((pedido,index)=>{
  
        const fechaBase = new Date(`${pedido.fecha}T00:00:00`);       
      
        const [hora, minutos] = pedido.horario.split(":").map(Number);
        fechaBase.setHours(hora, minutos, 0, 0);

        return {    
                        id: index.toString(),
                        title:pedido.cliente,
                        start:fechaBase,
                        end:fechaBase,
                        allDay: false, 
                        // backgroundColor: pedido.pagado === "Sí" ? "#28a745" : "#dc3545",
                        extendedProps:{
                                        domicilio:pedido.domicilio,  
                                        direccion:pedido.direccion,
                                        pagado:pedido.pagado,
                                        abono:pedido.abono,
                                        total:pedido.total,
                                        valorReparto:pedido.valorReparto,
                                        productos: pedido.detalle_pedidos.map((detalle) => ({
                                                                                              id: detalle.id,
                                                                                              id_pedido:detalle.id_pedido,
                                                                                              nombre: detalle.nombre,
                                                                                              tamano: detalle.tamano,
                                                                                              rellenos: detalle.rellenos,
                                                                                              foto: detalle.foto,
                                                                                              detalles: detalle.detalles,
                                                                                              imagen: detalle.imagen,
                                                                                              moldeRedondo: detalle.moldeRedondo,
                                        })),


                        }

        }

      })

      NewArray.sort((a, b) => a.start.getTime() - b.start.getTime());      
      
      setEventList(NewArray)
    
    },[listaPedidos])
 
      const handleDateClick = (info: DateClickArg) => {    
        
        const calendarApi = calendarRef.current?.getApi();

            if (calendarApi) {
               calendarApi.gotoDate(info.dateStr); 
               calendarApi.changeView("dayGridDay"); 
            }
    
            setCurrentView("dayGridDay"); 
      };    

      const handleChangeView = (viewName: string) => {
        
        if (calendarRef.current) {

            const calendarApi = calendarRef.current.getApi();
            calendarApi.changeView(viewName);

            setCurrentView(viewName);

        }

      };
      
      const handleNextMonth = () => {
        if (calendarRef.current) {
          const calendarApi = calendarRef.current.getApi();
          calendarApi.next();
        }
      };    
     
      const handlePrevMonth = () => {
        if (calendarRef.current) {
          const calendarApi = calendarRef.current.getApi();
          calendarApi.prev(); 
        }
      };

      const handleDelete = async(id_pedido:number) => {

        Swal.fire({
                  title: "Quiere eliminar este pedido?",
                  showDenyButton: true,
                  showCancelButton: true,
                  showConfirmButton:false,
                  icon:"question",
                  // confirmButtonText: "Elimiar",
                  denyButtonText: `Eliminar`
        }).then( async (result) => {
          
          if (result.isDenied) {

              const data = await deletePedidi(id_pedido) 

              fetchPedidos()

              Swal.fire("Pedido Eliminado", "", "info");
              
              return data          
                            
          }
        });

      }

      const Validar = (valor:number) =>{

        if(valor){
            return Number(valor).toLocaleString('es-CL',{style:'currency',currency:'CLP'})
        }else{
            return 0
        }


      }

  return (    

            <Box style={{ height: "90vh", width: "100%" }}>
              
              <Box sx={{display:'flex', 
                        justifyContent:{xs:'center',sm:'space-between'}, 
                        flexDirection:{xs:'column',sm:'column',md:'row'}
                      }}>

                  <Box sx={{display:'flex',justifyContent:{xs:'center'}}}>
                      <Button variant='contained' size="small" sx={{margin:'5px'}} onClick={() => handleChangeView("dayGridMonth")}>Mes</Button>                  
                      <Button variant='contained' size="small" sx={{margin:'5px'}} onClick={() => handleChangeView("listWeek")}>Lista Semana</Button>
                      <Button variant='contained' size="small" sx={{margin:'5px'}} onClick={() => handleChangeView("listMonth")}>Lista Mes</Button>
                  </Box>  
                  
                  <Box sx={{display:'flex', justifyContent:{xs:'center'}}}>
                      <Button variant='contained' size="small" sx={{margin:'5px'}} onClick={handlePrevMonth}>
                          <ArrowBackIosOutlinedIcon />Mes 
                      </Button>

                      <Button variant='contained' size="small" sx={{margin:'5px'}} onClick={handleNextMonth}>
                          Mes <ArrowForwardIosOutlinedIcon/>
                      </Button>
                  </Box>                  

              </Box>

                <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin,listPlugin]} 
                            initialView={currentView}
                            height="100%"
                            locale={esLocale} 
                            firstDay={1} 
                            headerToolbar={{
                                start: "", 
                                center: "title",
                                end: ""
                            }}
                            
                            events={eventList}                                              
                            dateClick={handleDateClick}       
                            
                            eventContent={(eventInfo) => {
                              
                              const calendarApi = calendarRef.current?.getApi();
                              const currentViewType = calendarApi?.view.type;                              

                              const startDate = eventInfo.event.start;

                              if (!startDate) {
                                return
                              }

                              const horaInicio = new Date(startDate);
                              
                                  const horaInicioFormateada = horaInicio.toLocaleTimeString("es-CL", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hourCycle: "h23",
                              });

                              return (
                                <>                                
                            
                                  {currentViewType != "dayGridMonth" 
                                    ? (
                                    <>
                                        <span style={{fontWeight:'300', fontSize:'18px'}}>
                                          {currentViewType === "dayGridDay" &&  horaInicioFormateada}                                        
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </span>                                       
                                        
                                      

                                        <br/>                                   
                                       <Box sx={{display:'flex',justifyContent:'space-around',flexDirection:'column'}}>
                                            <div style={{ }}>
                                                <strong> 
                                                  {eventInfo.event.title}
                                                </strong>
                                                  <button
                                                        onClick={()=>handleDelete(eventInfo.event.extendedProps.productos[0].id_pedido)}
                                                        style={{
                                                                marginLeft: "8px",
                                                                backgroundColor: "red",
                                                                color: "white",
                                                                border: "none",
                                                                padding: "4px 6px",
                                                                cursor: "pointer",
                                                                borderRadius: "4px",
                                                        }}>
                                                        X
                                                  </button>                                                  
                                              </div>
                                             {
                                                eventInfo.event.extendedProps.domicilio 
                                                ? <strong style={{fontWeight:'800',color:'blueviolet'}}>{eventInfo.event.extendedProps.direccion}</strong>
                                                : <strong style={{fontWeight:'800',color:'blueviolet'}}>Retiro en local</strong>
                                                  
                                              }                                                                                   
                                                {
                                                  eventInfo.event.extendedProps.productos.map((prod:DetalleProd,index:number)=>(
                                                      
                                                    <div key={prod.nombre + index} style={{display:'flex',flexWrap:'wrap',flexDirection:'column'}}>
                                                        {/* <li> {prod.nombre} &nbsp;&nbsp;({ prod.tamano })</li>                                                    */}
                                                        {prod.nombre} &nbsp;&nbsp;({ prod.tamano }) 
                                                          <>
                                                               <br/>
                                                                {prod.rellenos && (
                                                                  <>
                                                                    &nbsp;&nbsp;- {prod.rellenos}
                                                                    <br />
                                                                  </>
                                                                )}                                                    
                                                              
                                                                {prod.nombre.includes("Torta") && (
                                                                  <>
                                                                    &nbsp;&nbsp;- {prod.moldeRedondo ? "Molde Redondo" : "Molde Cuadrado"}
                                                                    <br />
                                                                  </>
                                                                )}                                                                                              
                                                                
                                                                {prod.foto && (
                                                                  <>
                                                                      &nbsp;&nbsp;-  {prod.imagen}
                                                                      <br/>
                                                                  </>
                                                                )
                                                              }
                                                              {
                                                                prod.detalles && (
                                                                  <div style={{display:'flex',flexWrap:'wrap',  wordBreak: "break-word",whiteSpace: "normal"}}>
                                                                    &nbsp;&nbsp;- {prod.detalles}
                                                                  </div >
                                                                )
                                                              }                                                              
                                                          </>
                                                    </div>
                                                    

                                                  ))
                                                }
                                                <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                                                  <br/>
                                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>                                                        
                                                          <tr>
                                                            <th>Reparto</th>
                                                            <th>Abono</th>
                                                            <th>Total</th>
                                                            <th>Deve</th>
                                                          </tr>                                                        
                                                        <tbody>
                                                            <tr style={{textAlign:'center'}}>

                                                              <td> { Validar(eventInfo.event.extendedProps.ValorReparto) } </td>
                                                              <td> { Validar(eventInfo.event.extendedProps.abono) } </td>
                                                              <td> {Validar(eventInfo.event.extendedProps.total)} </td>

                                                              <td>
                                                                {
                                                                  (() => {
                                                                    const total = Number(eventInfo.event.extendedProps.total) || 0;
                                                                    const reparto = Number(eventInfo.event.extendedProps.ValorReparto) || 0;
                                                                    const abono = Number(eventInfo.event.extendedProps.abono) || 0;
                                                                    return (total - (reparto + abono)).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
                                                                  })()
                                                                }
                                                              </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>                                           
                                                  </div>     
                                       </Box>

                                      
                                    </> )
                                    :(
                                      <strong> {eventInfo.event.title}</strong>                                   
                                    )
                                  }
                                </>
                              );

                            
                            }}

                />
            </Box>
    
  )
}