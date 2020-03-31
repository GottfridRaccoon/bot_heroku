const mariadb = require('mariadb')
const config = require('config')
const username = config.get('user')
const passwd = config.get('password')
const hostname = config.get ('host')

let pool = mariadb.createPool({
  host: hostname,
  user: username,
  password: passwd,
  connectionLimit: 5,
  database: 'bot',
  charset: 'utf8mb4'
})

module.exports = function DB(){
  let user= []
     
    pool.getConnection()
        .then(conn => {
            console.log("Подключилось, идендификатор подключения : " + conn.threadId);
            conn.release()
        })
        .catch(err => {
            console.log("Не подключилось, ошибка: " + err);
        });
        
   async function selectTable(table,columns, value){//Поскольку код асинхронный передача значения функции тоже
    // должна быть асинхроном
     try{
      await  pool.query ({rowsAsArray:true, sql:"SELECT "+columns+" FROM `"+table+"` WHERE "+value
    }).then((query)=>{
           user=query
          // console.log("!!!!!!!SELECT "+columns+" FROM `"+table+"` WHERE "+value)
       }).catch(err => console.log(err))
      }
      catch(e)
      {
          console.log(e)
       throw e
        }
    }
    function createQuery (usr_id,first_name,last_name,username){
        pool.query({rowsAsArray:true,
     sql:
      `INSERT IGNORE INTO users (user_id, Username,FirstName, SecondName) VALUES ('${usr_id}','${username}','${first_name}','${last_name}')
      `})
      //ON DUPLICATE KEY user_id UPDATE Username ='${username}', FirstName ='${first_name}',SecondName ='${last_name}'`
      .catch((err)=>{
        //switch(err){
         // case 1062:
           // break;
          //default:
            console.log(err)
        }
      })
    }


// catch(e){
//   switch(e){
//     case 23000:
//   break;
//   default
//   console.log(e)


//   }
// }
//   })
// }
  async function setGlobalRank (username,rank,is_admin){
    try
    {
    await selectTable("users","Username","`Username`='"+username+"'")//передается результат вызова selectTable со значением username
    // при вызове выполняется запрос в бд
    console.log(user[0][0])
     pool.query({rowsAsArray:true,
        sql: "UPDATE users SET chmod="+rank+" WHERE `Username`='"+user[0][0]+"'"
        })        
  .catch(log => console.log(log))
      }
      catch(e)
      {
        console.log(e)
        throw e;
      }
  
    }
    function setLocalRank(rank){
        pool.query({rowsAsArray:true, sql:`INSERT INTO chat(rank) VALUES ('${rank}')`})
        .catch((err)=>{
         
           

        } )
    }
    return {
      createQuery: createQuery,
     setGlobalRank: setGlobalRank,
    setLocalRank: setLocalRank
  }
    
}

        
   
