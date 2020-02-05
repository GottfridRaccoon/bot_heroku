const mariadb = require('mariadb')
const config = require('config')
const username = config.get('user')
const passwd = config.get('password')
const hostname = config.get ('host')

function DB(){
    return {
        createQuery: createQuery,
        setGlobalRank: setGlobalRank,
        setLocalRank: setLocalRank
    }



    const pool = mariadb.createPool({
        host: hostname,
        user: username,
        password: passwd,
        connectionLimit: 5,
        database: 'gottfrid_db',
        charset: 'utf8mb4'
    })
    pool.getConnection()
        .then(conn => {
            console.log("Подключилось, идендификатор подключения : " + conn.threadId);
            conn.release()
        })
        .catch(err => {
            console.log("Не подключилось, ошибка: " + err);
        });

    
    function createQuery (usr_id,first_name,last_name,username){
        pool.query({rowsAsArray:true,
     sql: `INSERT INTO users (user_id, first_name, Last_Name, username ) VALUES ('${usr_id}','${first_name}','${last_name}','${username}')`})

    }
    function setGlobalRank (rank){
        pool.query({rowsAsArray:true,
        sql: `INSERT INTO users (rank) VALUES ('${rank}')`
        })
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