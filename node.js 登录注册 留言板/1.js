const express=require('express');
//连接数据库
const mysql=require("mysql");

const server=express();

let db=mysql.createConnection({
	host:"localhost",//端口号
	user:"root",//用户名
	password:"",//密码
	database:"wyy1"//文件名称
})

server.get('/add',(req,res)=>{
//	res.send("[[1],[2],[3],[4]]");
	db.query('select * from one',(err,data)=>{//select * from one查询表格
		if(err){
			res.send({err:true,msg:"数据库错误"})//当err为true时msg返回"错误"
			res.end()//结束
		}else{
			res.send({err:false,data});//返回出内容
				res.end();//结束
		}
	})
})
console.log("服务启动")
server.listen(8124);//


server.use(express.static('www'))
