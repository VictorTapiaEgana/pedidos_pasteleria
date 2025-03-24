import { useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import { EventClickArg } from "@fullcalendar/core";  
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
import { getPedido } from "../../../type/types";

export default function CalendarDay( listaPedidos:getPedido[] ) {

    const calendarRef =useRef<FullCalendar | null>(null);  
    const [currentView, setCurrentView] = useState('dayGridMonth');  
 
      const handleEventClick = (info:EventClickArg) => {

            const eventId = info.event.extendedProps.id;
            console.log("ID del evento:", eventId);
 
      };

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
                            
                            events={[
                                { 
                                    title: "Evento 1", 
                                    date: "2025-03-23", 
                                    extendedProps: { id: "123", description: "Descripción del evento 1", location:"Ovalle" }
                                  },
                                  { 
                                    title: "Evento 2", 
                                    date: "2025-03-24", 
                                    extendedProps: { id: "456", description: "Descripción del evento 2", location:"Coquimbo" }
                                  },
                                  { 
                                    title: "Evento 3", 
                                    date: "2025-03-23", 
                                    extendedProps: { id: "789", description: "Descripción del evento 3", location:"Serena" }
                                  },
                            ]}

                            eventClick={handleEventClick}                            
                            dateClick={handleDateClick}       
                            
                            eventContent={(eventInfo) => {
                              const calendarApi = calendarRef.current?.getApi();
                              const currentViewType = calendarApi?.view.type;
                    
                              return (
                                <>
                                  <strong>{eventInfo.event.title}</strong>
                                  {currentViewType === "dayGridDay" && (
                                    <>
                                      <p>{eventInfo.event.extendedProps.description}</p>
                                      <p>{eventInfo.event.extendedProps.location}</p>
                                    </>
                                  )}
                                </>
                              );
                            }}

                />
            </Box>
    
  )
}