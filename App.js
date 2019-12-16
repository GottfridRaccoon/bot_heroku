const Telegram =require( 'node-telegram-bot-api')
const filesystem = require('fs')
const token = '1015454315:AAGoHh-52nc8mzKa1P33TKu5J0XkIP3dbfw'
const option = {polling:true}
const gottfrid_bot = new Telegram(token, option)
const filefolder = 'logs/log.txt'
let note =[]
let currDate = `${new Date().getHours().toString().padStart(2,'0')}:${new Date().getMinutes()}`
  

//console.log(currDate)



gottfrid_bot.onText(/\/bream(.+)/,(msg,match)=>{
    
        const [chatId, personName, resp, photobream] =  [msg.chat.id, msg.from.username,  match[1], 'img/bream.jpg']
        gottfrid_bot.sendPhoto(chatId,
                            photobream,
                            {
                                caption: `${resp}, Вам от @${personName}`
                            }
        )
        filesystem.appendFileSync(filefolder,`/bream by @${personName} at ${currDate} in ${chatId} \r\n`)


})
//напоминание
gottfrid_bot.onText(/\/reminder(.+) at ([0-9]{2}):([0-9]{2})/ ,(message, match)=>{
 const [chatId,usrId,usrName] = [message.chat.id, message.from.id,message.from.username]


 if(Number.isNaN(match[2]) || Number.isNaN(match[3]))
    { 
        console.log('sssss')
     gottfrid_bot.sendMessage(chatId, 'Ошибка при вводе времени')

    } 
     else  
     {
  


     gottfrid_bot.sendMessage(chatId, 'Напомню');
     let text = match[1]
     const time = `${match[2]}:${match[3]}`

     //  console.log(currDate)
     note.push({
         'id': usrId,
         'time': time,
         'text': text,
         'username': usrName
     })
     setInterval(() => {
         // let date= currDate передача по ссылке не работает не меняя своего значения
         let date = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes()}`


         note.map((item, i) => {
             //  console.log(date)
             if (note[i]['time'] === date) {
                 gottfrid_bot.sendMessage(chatId, `@${note[i]['username']},вы должны ${note[i]['text']}`)
                 note.splice(i, 1)
             }
         })
     }, 1000)

     filesystem.appendFileSync(filefolder, `/reminder by @${usrId} at ${currDate} in ${chatId} \r\n`)
}
  

   })
    


