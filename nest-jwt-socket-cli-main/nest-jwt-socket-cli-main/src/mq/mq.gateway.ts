import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { MqService } from './mq.service';
import { CreateMqDto } from './dto/create-mq.dto';
import { UpdateMqDto, UpdataAvataro } from './dto/update-mq.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MqGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly mqService: MqService) {}

  @SubscribeMessage('createMq')
  create(@MessageBody() createMqDto: CreateMqDto) {
    return this.mqService.create(createMqDto);
  }

  @SubscribeMessage('createAvataro')
  createAvataro(@MessageBody() updataAvataro: UpdataAvataro) {
    return this.mqService.createAvataro(updataAvataro.id, updataAvataro);
  }

  @SubscribeMessage('findAllMq')
  findAll() {
    return this.mqService.findAll();
  }

  @SubscribeMessage('findOneMq')
  findOne(@MessageBody() username: string) {
    return this.mqService.findOne(username);
  }

  @SubscribeMessage('updateMq')
  update(@MessageBody() updateMqDto: UpdateMqDto) {
    return this.mqService.update(updateMqDto.id, updateMqDto);
  }

  @SubscribeMessage('removeMq')
  remove(@MessageBody() id: number) {
    return this.mqService.remove(id);
  }

  @SubscribeMessage('connection')
    t(
        @MessageBody() data: {
            username: string,
        },
        @ConnectedSocket() client: Socket,
    ): WsResponse<unknown> {
        client.emit('join', async (client) => {
            client.join(data.username);
        })
        return { event: 'join', data: '服务端推送到客户端' };
        //这里相当于服务端向客户端emit一个qaq事件
    }

    @SubscribeMessage('sendMessage')
    sendMessage(
        @MessageBody() data: {
            to: string,
        },
        @ConnectedSocket() client: Socket,
    ): WsResponse<unknown> {
        client.broadcast.emit('showMessage');
        client.emit('showMessage')
        return;
    }
}
