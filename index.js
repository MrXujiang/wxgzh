'use strict'

let Koa = require('koa')
let sha1 = require('sha1')
let config = {
	wechat: {
		appID: 'wx042053c03aa4714b',
		appSecret: '118f3b03c5592e0671a5e29a56a41eba',
		token: 'zxzk'
	}
}

let app = new Koa()

app.use(function *(next) {
	console.log(this.query)

	let token = config.wechat.token
	let signature = this.query.signature
	let nonce = this.query.nonce
	let timestamp = this.query.timestamp
	let ecostr = this.query.ecostr
	let str = [token, timestamp, nonce].sort().join(',')
	let sha = sha1(str)

	if(sha === signature) {
		this.body = ecostr + ''
	}
	else {
		this.body = 'wrong'
	}
})

let port = 3002;
app.listen(port)
console.log(`listening： ${port}`)