import axios from "axios";
import { Telegraf } from "telegraf";
import { rolesF } from './mappers/parametros';
import { horario } from "./mappers/parametros";
import { pendiente } from "./mappers/parametros";

export class consultas{

    PagosEntreFechas(jwt:string, bot:Telegraf, chat:number, parametros:string[]){
        axios.get('http://localhost:8089/cobros/PagosByCedulaAndFechasBetween/116380047/2021-08-01/2021-10-31'+parametros, 
            {headers:{
                Authorization: 'bearer ' + jwt,
            }}).then(function (result) {
                let aux = result.data as Array<pendiente>
                let total:number = 0
                for(let i of aux){
                    total = total + parseInt(i.monto)
                }
                bot.telegram.sendMessage(chat, "El monto pendiente asignado a la cedula " + parametros + " es de " + String(total) +" colones 💰")
            });
    }

    CedPendiente(jwt:string, bot:Telegraf, chat:number, parametros:string[]){
        axios.get('http://localhost:8089/cobros/CobroByCedula/'+parametros, 
            {headers:{
                Authorization: 'bearer ' + jwt,
            }}).then(function (result) {
                let aux = result.data as Array<pendiente>
                let total:number = 0
                for(let i of aux){
                    total = total + parseInt(i.monto)
                }
                bot.telegram.sendMessage(chat, "El monto pendiente asignado a la cedula " + parametros + " es de " + String(total) +" colones 💰")
            });
    }

    Parametros(jwt:string, bot:Telegraf, chat:number, parametros:string[]){
        axios.get('http://localhost:8089/parametros/valor/valor?valor='+parametros, 
            {headers:{
                Authorization: 'bearer ' + jwt,
            }}).then(function (result) {
                let aux = result.data as Array<horario>
                for(let i of aux)
                bot.telegram.sendMessage(chat,i.descripcion)
            });
    }

    Roles(jwt:string, bot:Telegraf, chat:number, parametros:string[]){
        axios.get('http://localhost:8089/roles/id/1', 
        {headers:{
            Authorization: 'bearer ' + jwt,
        }}).then(response => {
            let aux = response.data as rolesF
            bot.telegram.sendMessage(chat,aux.nombre)
        }).catch(err => {
            console.log(err, err.response);
        })
    }

    // Horario(jwt:string, bot:Telegraf, chat:number, parametros:string){
    //     axios.get('http://localhost:8089/parametros/valor/valor?valor=2', 
    //         {headers:{
    //             Authorization: 'bearer ' + jwt,
    //         }}).then(function (result) {
    //             let aux = result.data as Array<horario>
    //             for(let i of aux)
    //             bot.telegram.sendMessage(chat,i.descripcion)
    //         });
    // }
    
} 