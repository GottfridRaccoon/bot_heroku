const TelegramBot =require( 'node-telegram-bot-api')

const token = '1015454315:AAE4Pri3dlFPlnceH9DC67g7w4ge5C17fK8'
const gottfrid_bot = new TelegramBot(token, {polling: true})

gottfrid_bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1]; 

   gottfrid_bot.sendMessage(chatId, resp);
});
gottfrid_bot.onText(/\/bream(.+)/,(msg,match)=>{
    const chatId = msg.chat.id
        const id_person =msg.from.id
        const personName =msg.from.username
        const  resp = match[1]
       // gottfrid_bot.sendMessage(id_person,`${resp}, Вам от @${personName}`)
        const photobream ='img/bream.jpg'
        gottfrid_bot.sendPhoto(chatId,
                            photobream,
                            {
                                caption: `${resp}, Вам от @${personName}`
                            }



        )

})


//gottfrid_bot.on('message', (msg) => {
  //  const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
 //   gottfrid_bot.sendMessage(chatId, 'Received your message');
//});