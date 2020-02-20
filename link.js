const mariadb = require('mariadb')
const config = require('config')
const username = config.get('user')
const passwd = config.get('password')
const hostname = config.get ('host')
let user = []
let pool = mariadb.createPool({
  host: hostname,
  user: username,
  password: passwd,
  connectionLimit: 5,
  database: 'bot',
  charset: 'utf8mb4'
})

function DB(){
    return {
        createQuery: createQuery,
       setGlobalRank: setGlobalRank,
      setLocalRank: setLocalRank
    }

    pool.getConnection()
        .then(conn => {
            console.log("Подключилось, идендификатор подключения : " + conn.threadId);
            conn.release()
        })
        .catch(err => {
            console.log("Не подключилось, ошибка: " + err);
        });

    function selectTable(table,row, value){
        pool.query ({rowsAsArray:true, sql:"SELECT "+row+" FROM `"+table+"` WHERE `"+row+"`='"+value+"'"})
        .then(query=> user=query)
    }
    function createQuery (usr_id,first_name,last_name,username){
        pool.query({rowsAsArray:true,
     sql: `INSERT INTO users (user_id, Username,FirstName, SecondName) VALUES ('${usr_id}','${username}','${first_name}','${last_name}')`})

    }
function query (table, username,rank){
  pool.query({
    rowsAsArray: true,
    sql: `SELECT user_id, rank FROM ${table} WHERE username =${is_admin} `

  }).then(usr => {
      


  })
}
   function setGlobalRank (username,rank,is_admin){
     
    
     console.log(username)
     
     pool.query({rowsAsArray:true,
        sql: "UPDATE users SET chmod="+rank+" WHERE `Username`='"+username+"'"
        }).catch(log => console.log(log))
    }
    function setLocalRank(rank){
        pool.query({rowsAsArray:true, sql:`INSERT INTO chat(rank) VALUES ('${rank}')`})
    }
  
    
}
module.exports=DB
        
   
//pool.query({ rowsAsArray: true, sql: 'select * from test' })
  // .then(res => {
   //     console.log(res);
        
    //});