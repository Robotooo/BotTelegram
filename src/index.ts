const { Telegraf } = require('telegraf')
import axios, {AxiosResponse} from 'axios';
import { authF } from './auth'
const bot = new Telegraf('2069797539:AAFWwLYZjrftI4tHtoNVBMNIUE8m3PT_zHU')
var token:authF

const config = {
    headers: { 
		'Content-Type': 'application/json'
	}
};

const bodyParameters = {
	cedula: "roboto",
	password: "botcito"
 };

function conect(consulta:string, chat:string){
	
	axios.post('http://localhost:8089/autentication/', bodyParameters, config)
	.then((response)=>{
		token = response.data as authF
		var aux:string
		aux=token.jwt
		console.log(response.status)
		console.log(aux)
		//const config2 = {headers: { Authorization: `bearer ${token}`}};
	},(error)=>{
		console.log(error)
	})

}



bot.command('/help', async(ctx:any) => {
	var msg = ctx.message.text;
	//conect("help","")
	ctx.reply("/horario Devuelve el horario de la empresa\n/licencia Devuelve la formula de licencias comerciales\n" +
	"/limpieza Devuelve la formula limpieza de vias\n/rutas Devuelve la formula rutas de buses\n" +
	"/pendiente cedula Devuelve los pendientes asociados a una cedula")
})

bot.command('/horario', async(ctx:any) => {
	var msg = ctx.message.text;
	conect("horario","")
	
})

bot.command('/licencia', async(ctx:any) => {
	var msg = ctx.message.text;
	conect("licencia","")

})

bot.command('/limpieza', async(ctx:any) => {
	var msg = ctx.message.text;
	conect("limpieza","")

})

bot.command('/rutas', async(ctx:any) => {
	var msg = ctx.message.text;
	conect("rutas","")

})

bot.command('/pendiente', async(ctx:any) => {
	var msg = ctx.message.text;
	conect("pendiente","")

})

bot.start((ctx: any) => ctx.reply('Bienvenido, Digita /help para visualizar los comandos disponibles'))



bot.launch();