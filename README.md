# next-webchat
next + nest webchat repository
<br>
在线网络聊天室
<br>
前端：next + React 服务端渲染，使用@reduxjs/toolkit ++ hook 搭配使用 react-redux 使得状态管理更易上手，外加socket.io-client 实现在线聊天平台
<br>
styled-components: 样式隔离，易维护，具有js特性，可根据prop值写动态样式，皆在助力react开发
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
