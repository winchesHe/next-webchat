# next-webchat
next + nest webchat repository
在线网络聊天室
<br>
进入nest-jwt-socket-cli-main\nest-jwt-socket-cli-main\src\app.module.ts
```ts
type: 'mysql',
host: 'localhost',
port: 3306,
username: 'root',
password: 'root',
database: 'nextserve',
entities: [MqUser, Message],
synchronize: true,
```
按需更改用户名和密码
随后进入各包下载依赖运行
前端用pnpm后端用npm