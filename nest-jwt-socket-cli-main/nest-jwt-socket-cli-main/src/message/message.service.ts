import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { findMessageListDTO } from './dto/find-messageList.dto';
import { Message } from './model/message.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageModel: Repository<Message>
  ) { }

  async create(createMessageDto: CreateMessageDto) {
    this.messageModel.save(createMessageDto)
    return {
      code: '200',
      msg: '发送成功'
    }
  }
  async findMessageList(findMessageListObj: findMessageListDTO) {
    console.log(findMessageListObj)
    const res1 = await this.messageModel.find({
      where: {
        sender: findMessageListObj.username,
        receiver: findMessageListObj.currentChater
      }
    })
    const res2 = await this.messageModel.find({
      where: {
        sender: findMessageListObj.currentChater,
        receiver: findMessageListObj.username
      }
    })
    return {
      code: '200',
      msg: '查询成功',
      data: {
        messageList: [
          ...res1,
          ...res2
        ].sort((a, b) => a.id - b.id)
      }
    }
  }

}
