import axios from "axios";
import { Telegraf } from "telegraf";
import { rolesF } from './mappers/parametros';
import { horario } from "./mappers/parametros";
import { pendiente } from "./mappers/parametros";
import { pago } from "./mappers/parametros";

export class consultas{

    PendienteImpuesto(jwt:string, bot:Telegraf, chat:number, parametros:string[]){
        var url = ""
        var tipo = ""
        let total:number = 0
        if(parametros[2] == "1"){
            tipo = "licencia comercial"
            url = 'http://localhost:8089/cobros/CobroByCedulaLicencias/' + parametros[1]
        }
        if(parametros[2] == "2"){
            tipo = "limpieza de vías"
            url = 'http://localhost:8089/cobros/CobroByCedulaPropiedades/' + parametros[1]
        }
        if(parametros[2] == "3"){
            tipo = "ruta de bus"
            url = 'http://localhost:8089/cobros/CobroByCedulaRutas/' + parametros[1]
        }
        axios.get(url,
            {headers:{
                Authorization: 'bearer ' + jwt,
            }}).then(function (result) {
                let aux = result.data as Array<pago>
                if(aux != null){  //este else es el que hay que revisar, cuando no hay pagos
                    bot.telegram.sendMessage(chat, "No hay pagos asignados a la cedula " + parametros[1] + " por el tipo de impuesto de " + tipo + " 💸")
                }
                for(let i of aux){
                    total = total + parseInt(i.monto)
                }
                bot.telegram.sendMessage(chat, "El monto pendiente asignado a la cedula " + parametros[1] + " por el tipo de impuesto de " + tipo + " es de " + String(total) + " colones 💰")
                
            });
    }

    PagosEntreFechas(jwt:string, bot:Telegraf, chat:number, parametros:string[]){
        axios.get('http://localhost:8089/cobros/PagosByCedulaAndFechasBetween/' +parametros[1] + '/' + parametros[2] + '/' + parametros[3],
        //axios.get('http://localhost:8089/cobros/PagosByCedulaAndFechasBetween/116380047/2021-08-01/2021-10-31'+parametros, 
            {headers:{
                Authorization: 'bearer ' + jwt,
            }}).then(function (result) {
                let aux = result.data as Array<pago>
                if(aux != null){
                    bot.telegram.sendMessage(chat, "👤 Los pagos asignados a la cedula " + parametros[1] + " son los siguientes: ")
                } else{ //este else es el que hay que revisar, cuando no hay pagos
                    bot.telegram.sendMessage(chat, "No hay pagos asignados a la cedula " + parametros[1] + " entre las fechas " + parametros[2] + " " + parametros[3] + " 💸")
                }
                for(let i of aux)
                bot.telegram.sendMessage(chat,"Monto: " + i.monto + " 💵 Fecha de cancelación: " + i.fechaModificacion + " ✔️")
            });
    }

    CedPendiente(jwt:string, bot:Telegraf, chat:number, parametros:string[]){
        axios.get('http://localhost:8089/cobros/CobroByCedula/' + parametros, 
            {headers:{
                Authorization: 'bearer ' + jwt,
            }}).then(function (result) {
                let aux = result.data as Array<pendiente>
                let total:number = 0
                for(let i of aux){
                    total = total + parseInt(i.monto)
                }
                bot.telegram.sendMessage(chat, "El monto pendiente asignado a la cedula " + parametros + " es de " + String(total) + " colones 💰")
            });
    }

    Parametros(jwt:string, bot:Telegraf, chat:number, parametros:string[]){
        axios.get('http://localhost:8089/parametros/valor/valor?valor=' + parametros, 
            {headers:{
                Authorization: 'bearer ' + jwt,
            }}).then(function (result) {
                let aux = result.data as Array<horario>
                for(let i of aux)
                bot.telegram.sendMessage(chat, i.descripcion)
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