const pkg = require('./package')
const config = require('./server/db/dbconfig')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./server/router/index') // localhost:3000/
const movie = require('./server/router/movie')

// 这里连接的是从router /api/movie 引自models/schema/movie 模型
const db = mongoose.connect(config.mongodb);
// 数据库连接
db.connection.on("error", function(error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function() {
    console.log("------数据库连接成功！------");
});
// Use native promises
mongoose.Promise = global.Promise

const app = express()
const port = process.env.PORT || 3000

// url请求解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// favicon
app.use(favicon(__dirname + '/src/assets/favicon.ico'))

// 静态资源
app.use(express.static('dist'))

// 设定路由
app.use('/', index)
app.use('/api', movie) // localhost:3000/api/movie/

app.listen(port, () => {
    console.log(`${pkg.name} listening on port ${port}`)
})