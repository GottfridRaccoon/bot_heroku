const TelegramBot =require( 'node-telegram-bot-api')

const token = '1015454315:AAE4Pri3dlFPlnceH9DC67g7w4ge5C17fK8'
const gottfrid_bot = new TelegramBot(token, {polling: true})

let note =[]

gottfrid_bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1]; 

   gottfrid_bot.sendMessage(chatId, resp);
});
gottfrid_bot.onText(/\/bream(.+)/,(msg,match)=>{
    
        const [chatId, personName, resp,photobream] =   [msg.chat.id, msg.from.username,  match[1], 'img/bream.jpg']
        
       // gottfrid_bot.sendMessage(id_person,`${resp}, Вам от @${personName}`)
        
        gottfrid_bot.sendPhoto(chatId,
                            photobream,
                            {
                                caption: `${resp}, Вам от @${personName}`
                            }



        )

})
//напоминание
gottfrid_bot.onText(/\/reminder(.+) at (.+)/,(message, match)=>{
            const chatId = message.chat.id
                        const usrId = message.from.username
            let text = match[1]
            let time = match[2]
            note.push ({'id':usrId, 
                        'time':time,
                        'text':text
                     })

                     gottfrid_bot.sendMessage(chatId, 'Напомню')


    setInterval(() => {
        //   let [hours, minutes] = [new Date().getHours(), new Date().getMinutes()]

        const currDate = `${new Date().getHours()}:${new Date().getMinutes()}`


        note.map((item, index) => {

            if (note[index]['time'] === currDate) {
                gottfrid_bot.sendMessage(chatId,`@${note[index]['id']},вы должны ${note[index]['text']}`)
                note.splice(index, 1)
            }
        })
    }, 1000)


                    })
    


//gottfrid_bot.on('message', (msg) => {
  //  const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
 //   gottfrid_bot.sendMessage(chatId, 'Received your message');
//});