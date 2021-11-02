import axios from "axios";
import { Telegraf } from "telegraf";
import { rolesF } from './mappers/parametros';
import { horario } from "./mappers/parametros";

export class consultas{

    //  Horario(jwt: string, bot:Telegraf, chat:number, parametros:string){
    //     axios.get('http://localhost:8089/parametros/valor/2', 
    //     {headers:{
    //         Authorization: 'bearer ' + jwt,
    //     }}).then(response => {
    //         var aux = response.data as horario
    //         bot.telegram.sendMessage(chat,aux.descripcion)
    //         console.log("info: "+aux.descripcion)
    //     }).catch(err => {
    //         console.log(err, err.response);
    //     })
    // }

    
    Horario(jwt:string, bot:Telegraf, chat:number, parametros:string){
        axios.get('http://localhost:8089/parametros/valor/valor?valor=2', 
        {headers:{
            Authorization: 'bearer ' + jwt,
        }}).then(response => {
            var aux = response.data as horario
            // for(let i in aux.descripcion){
                bot.telegram.sendMessage(chat,aux.descripcion[1])
            // }

        }).catch(err => {
            console.log(err, err.response);
        })
    }

    Roles(jwt: string, bot:Telegraf, chat:number, parametros:string){
        axios.get('http://localhost:8089/roles/id/1', 
        {headers:{
            Authorization: 'bearer ' + jwt,
        }}).then(response => {
            var aux = response.data as rolesF
            bot.telegram.sendMessage(chat,aux.nombre)
        }).catch(err => {
            console.log(err, err.response);
        })
    }
    
}