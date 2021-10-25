import { Telegraf } from "telegraf";
import axios, {AxiosResponse} from 'axios';
import { authF } from './auth'
import { consultas } from './consultas'
const bot = new Telegraf('2069797539:AAFWwLYZjrftI4tHtoNVBMNIUE8m3PT_zHU')
var token:authF, consultasNew = new consultas;


const config = {
    headers: { 
		'Content-Type': 'application/json'
	}
};

const bodyParameters = {
	cedula: "roboto",
	password: "botcito"
 };

function conect(consulta:number, chat:string){
	
	axios.post('http://localhost:8089/autentication/', bodyParameters, config)
	.then((response)=>{
		token = response.data as authF
		var aux:string
		aux=token.jwt
		console.log(response.status)
		console.log(aux)
	},(error)=>{
		console.log(error)
	})


}


bot.command('/help', async(ctx:any) => {
	var msg = ctx.message.text;
	ctx.reply("/horario Devuelve el horario de la empresa\n/licencia Devuelve la formula de licencias comerciales\n" +
	"/limpieza Devuelve la formula limpieza de vias\n/rutas Devuelve la formula rutas de buses\n" +
	"/pendiente cedula Devuelve los pendientes asociados a una cedula")
})

bot.command('/horario', async(ctx:any) => {
	var msg = ctx.message.text;
	conect(1,"")
})

bot.command('/licencia', async(ctx:any) => {
	var msg = ctx.message.text;
	conect(1,"")
	// axios.get('http://localhost:8089/roles/{all}',{headers: {
	// 	Authorization: 'bearer ' + token.jwt,
	// }}).then(resp => {
	// 	ctx.reply(resp.data)
	// 	console.log(resp.data);
	// });
})

bot.command('/limpieza', async(ctx:any) => {
	var msg = ctx.message.text;
	conect(1,"")

})

bot.command('/rutas', async(ctx:any) => {
	var msg = ctx.message.text;
	conect(1,"")

})

bot.command('/pendiente', async(ctx:any) => {
	var msg = ctx.message.text;
	conect(1,"")

})

bot.start((ctx: any) => ctx.reply('Bienvenido, Digita /help para visualizar los comandos disponibles'))



bot.launch();