import { Telegraf, Telegram } from "telegraf"
import axios, {AxiosResponse} from 'axios'
import { authF } from './mappers/auth'
import { consultas } from './consultas'
//import { start } from "repl"
const bot = new Telegraf('2070457111:AAFfAWLLLEcSSuYv92gBbyRQkyanywVO930')
var token:authF, consultasNew = new consultas;

const config = {
    headers: { 
		'Content-Type': 'application/json'
	}
}

const bodyParameters = {
	cedula: "roboto",
	password: "botcito"
 }

function conect(consulta:number, chat:number, parametro:string, bot:Telegraf){
	var error = false;
	axios.interceptors.response.use(response=>{
		return response
	},
	err=>{const{config,response:{status, data}}=err;
	console.log("entra el err")
		const requestAu = config;
		if(status==401){
			axios.post('http://localhost:8089/autentication/', bodyParameters, config)
			.then((response)=>{
				// token = response.data as authF
				var tokenBot = response.data as authF
				token.jwt = tokenBot.jwt  
				NumeroConsulta(consulta,tokenBot.jwt,chat,bot,parametro)
				console.log(response.status)
				console.log("lol")
				console.log("token---------" + tokenBot.jwt)
			}).catch(err=>{console.log(err,err.response)})
			error=true;
		}else{
			console.log("Logueado")
			NumeroConsulta(consulta, token.jwt, chat, bot, parametro)
		}})
		if(!error){
			NumeroConsulta(consulta, token.jwt, chat, bot, parametro)
		}
	error=false;
}

/*function conect(consulta:number, chat:number, parametro:string){
	
	axios.post('http://localhost:8089/autentication/', bodyParameters, config)
	.then((response)=>{
		////token = response.data as authF
		////var aux:string
		//aux=token.jwt
		//aux=token.jwt
		//aux=token.jwt
		//console.log(response.status)
		//console.log(aux)
		var tokenBot = response.data as authF
		console.log(tokenBot)
		NumeroConsulta(consulta,tokenBot.jwt,chat,bot,parametro)
		console.log(response.status)
		console.log("lol")
	},(error)=>{
		console.log("error:"+error)
	})
}*/

function NumeroConsulta(nConsulta:number,jwt:string, nChat:number,botCommand:Telegraf, parametros:string){
	switch(nConsulta){
		case 1:
			consultasNew.Roles(jwt,botCommand,nChat,parametros)
			console.log("finito")
			break
	}
}
function startBot(){
	axios.post('http://localhost:8089/autentication/', bodyParameters, config)
	.then(response=>{
		token = response.data as authF
	})
}

bot.hears("a",async(ctx)=>{
	startBot()
	ctx.reply("ola")
	ctx.reply('Bienvenido, Digita /help para visualizar los comandos disponibles')
})


bot.command('/help', async(ctx:any) => {
	var msg = ctx.message.text
	ctx.reply("/horario Devuelve el horario de la empresa\n/licencia Devuelve la formula de licencias comerciales\n" +
	"/limpieza Devuelve la formula limpieza de vias\n/rutas Devuelve la formula rutas de buses\n" +
	"/pendiente cedula Devuelve los pendientes asociados a una cedula")
})

bot.command('/horario', async(ctx:any) => {
	var msg = ctx.message.text
	var parametro = msg.split(' ')
	conect(1, ctx.from.id, parametro, bot)
})

bot.command('/licencia', async(ctx:any) => {
	var msg = ctx.message.text
	//conect(1,"")
	// axios.get('http://localhost:8089/roles/all',{headers: {
	// 	Authorization: 'bearer ' + token.jwt,
	// }}).then(resp => {
	// 	ctx.reply(resp.data)
	// 	console.log(resp.data)
	// });
})

bot.command('/limpieza', async(ctx:any) => {
	var msg = ctx.message.text
	//conect(1,ctx,"")
})

bot.command('/rutas', async(ctx:any) => {
	var msg = ctx.message.text
	//conect(1,ctx,"")
})

bot.command('/pendiente', async(ctx:any) => {
	var msg = ctx.message.text
	//conect(1,ctx,"")
})

bot.start((ctx: any) => ctx.reply(
	'Bienvenido , '+ ctx.nombre + ' Digita /help para visualizar los comandos disponibles'
	))

bot.launch()