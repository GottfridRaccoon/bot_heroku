const Telegram = require( "node-telegram-bot-api")
const filesystem = require("fs")
const config = require("config")
const token = config.get("token")
const gottfrid_bot = new Telegram(token, {polling : true})
let note =[]
//const mariadb = require('mariadb')
//const username = config.get('user')
//const passwd = config.get('password')
//const hostname = config.get('host')
//let Telegnames = []
const Database = require('./link.js')
let db =new Database()

const files = {
    johny: "img/Johny.jpg",
    bream: "img/bream.jpg",
    log: "logs/log.txt",
    raccoon : "img/got.png"
}

let currDate = `${new Date().getHours().toString().padStart(2,'0')}:${new Date().getMinutes()}`
gottfrid_bot.onText(/\/bream(.+)/,(message,match)=>{ 
console.log(new Date().getTime())
        const [chatId, personName, resp, msgId] =  [message.chat.id, message.from.username,  
                                                    match[1],message.message_id]
         gottfrid_bot.deleteMessage(chatId,msgId) 
          
          gottfrid_bot.sendMessage(chatId,`${resp}, Вам от @${personName}`)
                                                   
        gottfrid_bot.sendSticker(chatId,
                            files.bream,
                         
        )
        filesystem.appendFileSync(files.log,`/bream by @${personName} at ${currDate} in ${chatId} \r\n`)
})
    gottfrid_bot.onText(/\/herejohny(.+)/,(message, match)=>{
        const msgId = message.message_id
        gottfrid_bot.deleteMessage(message.chat.id,msgId)
        const [chatId, resp, usrName ] = [message.chat.id, match[1] ,message.from.username , message.message_id] 
        gottfrid_bot.sendMessage(chatId,`${resp}, лови топор`)
        gottfrid_bot.sendSticker(chatId,
            files.johny
         
        )
        filesystem.appendFileSync(files.log, `/hereJohny by @${usrName} at ${currDate} in ${chatId} \r\n`)

    })
gottfrid_bot.onText(/\/reminder(.+) at ([01]?[0-9]|2[0-3]):([0-5]?[0-9])/ ,(message, match)=>{
        const [chatId,usrId,usrName, msgId] = [message.chat.id, message.from.id,message.from.username]
        gottfrid_bot.deleteMessage(chatId,msgId)
        const hours = match[2].toString().padStart(2, '0')
                   let minutes =match[3]
                   gottfrid_bot.sendMessage(chatId, 'Напомню');
                   let text = match[1]
                   const time = `${hours}:${minutes}`
    note.push({
        'id': usrId,
        'time': time,
        'text': text,
        'username': usrName
    })
            setInterval(() => {
                let date = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes()}`
                note.map((item, i) => {
                    if (note[i]['time'] === date) {
                        gottfrid_bot.sendMessage(chatId, `@${note[i]['username']},вы должны ${note[i]['text']}`)
                        note.splice(i, 1)
                    }
                })
            }, 1000)
            filesystem.appendFileSync(files.log, `/reminder by @${usrName} at ${currDate} in ${chatId} \r\n`)    
        })
            


gottfrid_bot.onText(/\/chirp/,message=>{
    const msgId = message.message_id
    gottfrid_bot.deleteMessage(message.chat.id,msgId)
    gottfrid_bot.sendMessage(message.chat.id,'CHIIIIIIIIIIIIIIIIIRP CHIIIIIIIIIIIIRP CHIIIIIIIIIIIIIIIIIRP CHIIIIIIIIIIIIRP CHIIIIIIIIIIIIIIIIIRP CHIIIIIIIIIRP CHIIIIIIIIIIIIIIIIIRP CHIIIIIIIIIIIIRP CHIIIIIIIIIIIIIIIIIRP CHIIIIIIIIIIIIRP')
})
gottfrid_bot.onText(/\/gotya/, message=>{
    const msgId=message.message_id
    gottfrid_bot.deleteMessage(message.chat.id, msgId)
    gottfrid_bot.sendSticker(message.chat.id,files.raccoon)
})
gottfrid_bot.onText(/\/mow/,message=>{
    const msgId = message.message_id
    gottfrid_bot.deleteMessage(message.chat.id, msgId)
    gottfrid_bot.sendMessage(message.chat.id, `NO MOW`)    
})

gottfrid_bot.on('message', () => {    
    gottfrid_bot.getUpdates({ limit: 1 })
    .then((update) => {
        db.createQuery(update[0].message.from.id,update[0].message.from.first_name,update[0].message.from.last_name ,update[0].message.from.username)   
    })
    .catch(err => console.log(err))        
})

gottfrid_bot.onText(/\/setGlobalRank \@([A-Za-z0-9]+[A-Za-z0-9/_]*) ([0-9])/gi,(msg, match)=>{
 let usrId = msg.from.id
  
    db.setGlobalRank(match[1], match[2],usrId)
})
gottfrid_bot.onText(/\/balldestiny (.+)/, (msg) => {
    let rand = Math.round(Math.random() * 20)
    let chat = msg.chat.id
    switch (rand) {
        case 1:
            gottfrid_bot.sendMessage(chat, `Бесспорно`)
            break;
        case 2:
            gottfrid_bot.sendMessage(chat, `Предрешено`)
            break;
        case 3:
            gottfrid_bot.sendMessage(chat, `Без сомнения`)
            break;
        case 4:
            gottfrid_bot.sendMessage(chat, `Определенно да`)
            break;
        case 5:
            gottfrid_bot.sendMessage(chat, `Можешь быть уверен в этом`)
            break;
        case 6:
            gottfrid_bot.sendMessage(chat, `Мне кажется - да`)
            break;
        case 7:
            gottfrid_bot.sendMessage(chat, `Хорошие перспективы`)
            break;
        case 8:
            gottfrid_bot.sendMessage(chat, `Звезды говорят -да`)
            break;
        case 9:
            gottfrid_bot.sendMessage(chat, `Да`)
            break;
        case 10:
            gottfrid_bot.sendMessage(chat, `Пока что не ясно, попробуй снова`)
            break;
        case 11:
            gottfrid_bot.sendMessage(chat, `Спроси немного позже`)
            break;
        case 12:
            gottfrid_bot.sendMessage(chat, `Лучше не рассказывать`)
            break;
        case 13:
            gottfrid_bot.sendMessage(chat, `В данный момент нельзя предсказать`)
            break;
        case 14:
            gottfrid_bot.sendMessage(chat, `Сконцентрируйся и спроси опять`)
            break;
        case 15:
            gottfrid_bot.sendMessage(chat, `Вероятнее всего`)
            break;
        case 16:
            gottfrid_bot.sendMessage(chat, `Мой ответ — «нет»`)
            break;
        case 17:
            gottfrid_bot.sendMessage(chat, `По моим данным — «нет»`)
            break;
        case 18:
            gottfrid_bot.sendMessage(chat, `Даже не думай`)
            break;
        case 19:
            gottfrid_bot.sendMessage(chat, `Плохие перспективы`)
            break;
        case 20:
            gottfrid_bot.sendMessage(chat, `Сомневаюсь`)
            break;
        default:
            gottfrid_bot.sendMessage(chat, `Что-то пошло не так`)
            break;
    }

})


gottfrid_bot.onText(/\/whoami/, (msg, match)=>{
    let str =""
 for (let key in msg.from){
     if (msg.from[key] != msg.from.id){
         str =str+ `${key} => <b>${msg.from[key]}</b>\n`    
     }
 }
   gottfrid_bot.sendMessage(msg.chat.id, text = `${str}`,{ parse_mode: 'HTML' })

})

