const Telegram =require( 'node-telegram-bot-api')
const filesystem = require('fs')
const token = '1015454315:AAE4Pri3dlFPlnceH9DC67g7w4ge5C17fK8'
const option = {polling:true}
const gottfrid_bot = new Telegram(token, option)
const filefolder = 'logs/log.txt'
let note =[]
let currDate = `${new Date().getHours()}:${new Date().getMinutes()}`



gottfrid_bot.onText(/\/bream(.+)/,(msg,match)=>{
    
        const [chatId, personName, resp,photobream] =   [msg.chat.id, msg.from.username,  match[1], 'img/bream.jpg']
        gottfrid_bot.sendPhoto(chatId,
                            photobream,
                            {
                                caption: `${resp}, Вам от @${personName}`
                            }
        )
        filesystem.appendFileSync(filefolder,`/bream by @${personName} at ${currDate} in ${chatId} \r\n`)


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

        

        note.map((item, i) => {

            if (note[i]['time'] === currDate) {
                gottfrid_bot.sendMessage(chatId,`@${note[i]['id']},вы должны ${note[i]['text']}`)
                note.splice(i, 1)
            }
        })
    }, 1000)

    filesystem.appendFileSync(filefolder, `/reminder by @${usrId} at ${currDate} in ${chatId} \r\n`)

   })
    


//gottfrid_bot.on('message', (msg) => {
  //  const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
 //   gottfrid_bot.sendMessage(chatId, 'Received your message');
//});