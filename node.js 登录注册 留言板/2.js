const express = require("express")
const mysql = require("mysql")
const server = express();

const db = mysql.createConnection({
	host: "localhost",//端口号
	user: "root",   //用户名
	password: "",//密码
	database: "dlzhc"//数据名称
})
server.get("/add", (req, res) => {
	let username = req.query.username;
	let password = req.query.password;
	db.query(`select *from one where username ='${username}'`, (err,data) =>{//查询内容以及
		if(err) {
			res.send({
				err: true,//错误为真时反出'数据库查询失败'
				msg: "数据库查询失败"
			})
			res.end()
		} else {//反之
			if(data.length > 0) {//如果当数据库中的内容每一个大于0
				res.send({
					err: true,//错误为真时反出'用户名已存在'
					msg: "用户名已存在"
				})
				res.end();
			} else {//反之
				db.query(`insert into one values ('${username}','${password}')`, (err, data) => {//把要添加到的数据以标题("${  }")的方式添加在回调函数中传参err和data
					if(err) {//添加为true的时候添加失败
						res.send({
							err: true,
							msg: "添加失败"
						});
						res.end()
					} else {//反之正确
						res.send({
							err: false
						});
						res.end()
					}
				})
			}
		}
	})
});

//
server.get("/dl",(req,res)=>{
	db.query(`select * from one where username='${req.query.username}'`,(err,data)=>{
		if(err){//错误为真时反出'数据库查询失败'
			res.send({err:true,msg:"数据库查询失败"});
			res.end();
		}else{
			if(data.length==0){//当添加内容=0时反出内容"必须注册"
				res.send({err:true,msg:"请在注册后登录"});
				res.end();
			}else{//反之
				if(data[0].password==req.query.password){//如果内容中的密码=时说明正确登录成功
					res.send({err:0})
					res.end();
				}else{
					//反之密码错误反出:"用户名或者密码错误"
					res.send({err:1,msg:"用户名或者密码错误"})
					res.end();
				}
			}
		}
	})
})

server.listen(8124)
server.use(express.static("www"));