import axios from "axios";
import { Telegraf } from "telegraf";
import { rolesF } from './parametros';

export class consultas{

    Roles(jwt: string, bot:Telegraf, chat:number){
        axios.get('http://localhost:8089/roles/{all}', 
        {headers: {
            Authorization: 'bearer ' + jwt,
        }}).then(response => {
            var aux = response.data as rolesF;
            console.log("Roles: "+response.data)
            bot.telegram.sendMessage(chat,aux.nombre);
        })
        .catch(err => {
            console.log(err, err.response);
        });
    }
}