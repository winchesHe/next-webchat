import { Module } from '@nestjs/common';
import { MqService } from './mq.service';
import { MqGateway } from './mq.gateway';
import { MqUser } from './entity/mq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './mq.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MqUser])],
  providers: [MqGateway, MqService],
  controllers: [UsersController]
})
export class MqModule {}
