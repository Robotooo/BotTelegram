const { Telegraf } = require('telegraf')
import axios, {AxiosResponse} from 'axios';
import { authF } from './auth';
const bot = new Telegraf('2069797539:AAFWwLYZjrftI4tHtoNVBMNIUE8m3PT_zHU')
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMTIzNDUzNzgyIiwiaWF0IjoxNjM1MTI2NTA2LCJleHAiOjE2MzUxMzg1MDZ9.vYjsaB1Fw-Dkxrr-7hF6qu7BWFvDDx-BtQWrt4yPRPz6WcIf1EGOApWl2Yv6hUzR3-kYi3hFD0HwtId6Cobhsg";


const config = {
    headers: { 
		Authorization: `bearer ${token}` 
	}
};

const bodyParameters = {
	cedula: "0123453782",
	password: "Una2021"
 };



bot.command('/help', async(ctx:any) => {
	axios.post( 
		'http://localhost:8089/autentication/',
		bodyParameters,
		config
		)
		
	let resp = axios.get('http://localhost:8089/roles/{all}', config).then(console.log).catch(console.log);
	  
	ctx.reply(resp);
})


bot.launch();