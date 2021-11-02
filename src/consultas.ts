import axios from "axios";
import { Telegraf } from "telegraf";
import { rolesF } from './mappers/parametros';
import { horario } from "./mappers/parametros";

export class consultas{


    Horario(jwt:string, bot:Telegraf, chat:number, parametros:string){
        axios.get('http://localhost:8089/parametros/valor/valor?valor=2', 
            {headers:{
                Authorization: 'bearer ' + jwt,
            }}).then(function (result) {
                let aux = result.data as Array<horario>
                for(let i of aux)
                bot.telegram.sendMessage(chat,i.descripcion)
            });
    }

    Help(jwt:string, bot:Telegraf, chat:number, parametros:string){
        axios.get('http://localhost:8089/parametros/valor/valor?valor=3', 
            {headers:{
                Authorization: 'bearer ' + jwt,
            }}).then(function (result) {
                let aux = result.data as Array<horario>
                for(let i of aux)
                bot.telegram.sendMessage(chat,i.descripcion)
            });
    }


    Roles(jwt:string, bot:Telegraf, chat:number, parametros:string){
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
    
} 