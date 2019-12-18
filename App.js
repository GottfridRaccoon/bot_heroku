const Telegram =require( 'node-telegram-bot-api')
const filesystem = require('fs')
const config = require('config')
const token = config.get('token')
const option = {polling:true}
const gottfrid_bot = new Telegram(token, option)

let note =[]
const files = {
    johny: 'img/Johny.jpg',
    bream: 'img/bream.jpg',
    log: 'logs/log.txt'
}
let currDate = `${new Date().getHours().toString().padStart(2,'0')}:${new Date().getMinutes()}`
  


gottfrid_bot.onText(/\/bream(.+)/,(message,match)=>{
    
        const [chatId, personName, resp] =  [message.chat.id, message.from.username,  match[1]]
        gottfrid_bot.sendPhoto(chatId,
                            files.bream,
                            {
                                caption: `${resp}, Вам от @${personName}`
                            }
        )
        filesystem.appendFileSync(files.log,`/bream by @${personName} at ${currDate} in ${chatId} \r\n`)
})
    gottfrid_bot.onText(/\/hereJohny(.+)/,(message, match)=>{
        const [chatId, resp, usrName] = [message.chat.id, match[1], ,message.from.username]
        gottfrid_bot.sendPhoto(chatId,
            files.johny,
            {
                caption: `${resp}, лови топор`
            }
        )
        filesystem.appendFileSync(files.log, `/hereJohny by @${usrName} at ${currDate} in ${chatId} \r\n`)

    })
//напоминание
gottfrid_bot.onText(/\/reminder(.+) at ([01]?[0-9]|2[0-3]):([0-5]?[0-9])/ ,(message, match)=>{
 const [chatId,usrId,usrName] = [message.chat.id, message.from.id,message.from.username]
//попробуй шsInteger =number
   
const hours = match[2].toString().padStart(2, '0')
 let minutes =match[3]
    console.log(hours)
    console.log(minutes)
   //if (/[01]?[0-9]|2[0-3]/.test(hours) && /[0-5]?[0-9]/.test(minutes))
    //{ 
    gottfrid_bot.sendMessage(chatId, 'Напомню');
    let text = match[1]
    const time = `${hours}:${minutes}`

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
    //}
    filesystem.appendFileSync(files.log, `/reminder by @${usrName} at ${currDate} in ${chatId} \r\n`)    
   })
    


