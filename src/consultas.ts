import axios from "axios";
import { Telegraf } from "telegraf";
import { rolesF } from './mappers/parametros';

export class consultas{

    Roles(jwt: string, bot:Telegraf, chat:number, parametros:string){
        axios.get('http://localhost:8089/roles/id/1', 
        {headers:{
            Authorization: 'bearer ' + jwt,
        }}).then(response => {
            console.log("entra response")
            bot.telegram.sendMessage(chat,'oa')//revisar
            var aux = response.data as rolesF
            console.log("Roles: "+response.data)
            console.log("despues de roles")
            bot.telegram.sendMessage(chat,aux.nombre)//revisar
            console.log("despues de message"+aux.nombre)
        }).catch(err => {
            console.log(err, err.response);
        })
    }
}