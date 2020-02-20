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

function DB(){
  let user= []
     
    pool.getConnection()
        .then(conn => {
            console.log("Подключилось, идендификатор подключения : " + conn.threadId);
            conn.release()
        })
        .catch(err => {
            console.log("Не подключилось, ошибка: " + err);
        });
        
   async function selectTable(table,columns, value){
     
      await  pool.query ({rowsAsArray:true, sql:"SELECT "+columns+" FROM `"+table+"` WHERE "+value
    
    })
        .then((query)=>{
           user=query
           console.log("!!!!!!!SELECT "+columns+" FROM `"+table+"` WHERE "+value)
      
        }).catch(err => console.log(err))
        console.log(user)
    }
    function createQuery (usr_id,first_name,last_name,username){
        pool.query({rowsAsArray:true,
     sql: `INSERT INTO users (user_id, Username,FirstName, SecondName) VALUES ('${usr_id}','${username}','${first_name}','${last_name}')`})

    }
// function query (table, username,rank){
//   pool.query({
//     rowsAsArray: true,
//     sql: `SELECT user_id, rank FROM ${table} WHERE username =${is_admin} `

//   }).then(usr => {
      


//   })
// }
  async function setGlobalRank (username,rank,is_admin){
     
    
    await selectTable("users","Username","`Username`='"+username+"'")
    console.log(user[0][0])
     pool.query({rowsAsArray:true,
        sql: "UPDATE users SET chmod="+rank+" WHERE `Username`='"+user[0][0]+"'"
        })        
  .catch(log => console.log(log))
  
    }
    function setLocalRank(rank){
        pool.query({rowsAsArray:true, sql:`INSERT INTO chat(rank) VALUES ('${rank}')`})
        .catch((err)=>{
         
           

        } )
    }
    //let setGlobalRank= setGlobalRan.bind(selectTable)
    return {
      createQuery: createQuery,
     setGlobalRank: setGlobalRank,
    setLocalRank: setLocalRank
  }
    
}
module.exports=DB
        
   
//pool.query({ rowsAsArray: true, sql: 'select * from test' })
  // .then(res => {
   //     console.log(res);
        
    //});