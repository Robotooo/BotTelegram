const { Telegraf } = require('telegraf')
import axios, {AxiosResponse} from 'axios';
import { authF } from './auth';
const bot = new Telegraf('2069797539:AAFWwLYZjrftI4tHtoNVBMNIUE8m3PT_zHU')
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb2JvdG8iLCJpYXQiOjE2MzUxMzEyOTUsImV4cCI6MTYzNTE0MzI5NX0.UfnofsgYefIrVBbBehxobGwmhbyoTgtoXr4Gi-Ty0CLLgOAGRkkcFs0UY_fC9Dwz8J3xPBYjNu5Qiw6MlhKS5A";

const config = {
    headers: { 
		Authorization: `bearer ${token}` 
	}
};

const bodyParameters = {
	cedula: "roboto",
	password: "botcito"
 };

bot.command('/help', async(ctx:any) => {
	axios.post( 
		'http://localhost:8089/autentication/',
		bodyParameters,
		config
		)
	//const resp = await axios.get('http://localhost:8089/roles/{all}', config).then(console.log).catch(console.log);



	axios.get('http://localhost:8089/roles/{all}',config).then(resp => {
		ctx.reply(resp.data)
		console.log(resp.data);
	});


	
})

bot.launch();