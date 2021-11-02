import { Telegraf, Telegram } from "telegraf"
import axios, {AxiosResponse} from 'axios'
import { authF } from './mappers/auth'
import { consultas } from './consultas'
const bot = new Telegraf('2069797539:AAFWwLYZjrftI4tHtoNVBMNIUE8m3PT_zHU')
var token:authF, consultasNew = new consultas
var flag:boolean = true

const configHeader = {
    headers: { 
		'Content-Type': 'application/json'
	}
}

const bodyParameters = {
	cedula: "roboto",
	password: "botcito"
}

function connect(nConsulta:number, chat:number, parametro:string[], bot:Telegraf){
	var error = false
	axios.interceptors.response.use(response=>{
		return response
	},
	err =>{
		const{
			config,response:{
				status,data}}=err
		if(status==401){
			axios.post('http://localhost:8089/autentication/', bodyParameters, configHeader)
			.then(response=>{
				var botToken=response.data as authF
				token.jwt = botToken.jwt
				NumeroConsulta(nConsulta, botToken.jwt, chat, bot, parametro);
			}).catch(err=>{console.log(err,err.response)})
				error=true
		}else{
			NumeroConsulta(nConsulta, token.jwt, chat, bot, parametro)
		}})
		if(!error){
			NumeroConsulta(nConsulta, token.jwt, chat, bot, parametro)
		} 
		error=false
}

function NumeroConsulta(nConsulta:number,jwt:string, nChat:number, botCommand:Telegraf, parametros:string[]){
	switch(nConsulta){
		case 1:
			consultasNew.Parametros(jwt, botCommand,nChat, parametros)
			break
		case 2:

			break
		case 3:
			consultasNew.CedPendiente(jwt, botCommand, nChat, parametros)
			break
		case 4:
			consultasNew.PagosEntreFechas(jwt, botCommand, nChat, parametros)
			break
		case 5:
			consultasNew.PendienteImpuesto(jwt, botCommand, nChat, parametros)
			break
	}
}

bot.command('/inicio', async ctx => {
	var msg = ctx.message.text
	axios.post('http://localhost:8089/autentication/', bodyParameters, configHeader)
	.then(response=>{
		token = response.data as authF
	})
	ctx.reply("¡Hola " + ctx.from.first_name + "! Mi nombre es Roboto🤖, bienvenido al sistema de cobros de la municipalidad espero te encuentres bien, si deseas ver los comandos disponibles debes de digitar /ayuda")
})

bot.command('/formulas', async ctx => {
	var msg = ctx.message.text.split(" ")
	msg[0] = "1"
	ctx.reply("🧮 Formulas de calculo de impuestos 🧮")
	connect(1, ctx.from.id, msg, bot)
})

bot.command('/horario', async ctx => {
	var msg = ctx.message.text.split(" ")
	msg[0] = "2"
	ctx.reply("⏳ Horario de atención al cliente ⏳")
	connect(1, ctx.from.id, msg, bot)
})

bot.command('/ayuda', async(ctx:any) => {
	var msg = ctx.message.text.split(" ")
	msg[0] = "3"
	ctx.reply("Comandos de Roboto🤖")
	connect(1, ctx.from.id, msg, bot)
})

bot.command('/pendiente', async(ctx:any) => {
	var msg = ctx.message.text.split(" ")
	if(msg[1] != null){
		connect(3, ctx.from.id, msg[1], bot)
	} else{
		ctx.reply("⚠️ Digite el número de cedula seguido del comando para realizar la consulta")
	}
})

bot.command('/pagos', async(ctx:any) => {
	var msg = ctx.message.text.split(" ")
	if(msg[1] != null && msg[2] != null && msg[3] != null){
		connect(4, ctx.from.id, msg, bot)
	} else{
		ctx.reply("⚠️ Digite los datos necesarios (cedula, fecha inicio, fecha final) seguido del comando para realizar la consulta")
	}
})

bot.command('/impuesto', async(ctx:any) => {
	var msg = ctx.message.text.split(" ")
	if(msg[1] != null && msg[2] != null){
		console.log(msg)
		//connect(5, ctx.from.id, msg, bot)
	} else{
		ctx.reply("⚠️ Digite los datos necesarios (cedula, tipo de impuesto) seguido del comando para realizar la consulta")
	}
})

//TODO Las de abajo faltan.

// bot.on('message', async(ctx:any) => {
// 	var msg = ctx.message.text
// 	if(true){
// 	flag=false
// 	}
// })

// bot.command('/licencia', async(ctx:any) => {
// 	var msg = ctx.message.text
// })

// bot.command('/limpieza', async ctx => {
// 	var msg = ctx.message.text
// })

// bot.command('/rutas', async(ctx:any) => {
// 	var msg = ctx.message.text
// })

bot.launch()