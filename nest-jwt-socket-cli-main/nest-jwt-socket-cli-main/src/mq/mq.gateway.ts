import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { MqService } from './mq.service';
import { CreateMqDto } from './dto/create-mq.dto';
import { UpdateMqDto, UpdataAvataro } from './dto/update-mq.dto';
import { Server } from 'socket.io';

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
}
