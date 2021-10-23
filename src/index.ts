
const TelegramBot = require('node-telegram-bot-api')
const token = '2069797539:AAFWwLYZjrftI4tHtoNVBMNIUE8m3PT_zHU'
const bot = new TelegramBot(token, {polling: true})
var chatId;


bot.onText(/\/echo (.+)/, (msg?:any, match?:any) => {
	chatId = msg.chat.id
	const resp = match[1]
	bot.sendMessage(chatId, resp)
})

bot.onText(/\/info/, (msg?:any) => {
	const chatId = msg.chat.id
	bot.sendMessage(chatId, "No joda")
})

bot.on('message', (msg?:any) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Mensaje recibido');
});