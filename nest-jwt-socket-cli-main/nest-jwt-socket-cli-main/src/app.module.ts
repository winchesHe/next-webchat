import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqModule } from './mq/mq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqUser } from './mq/entity/mq.entity'
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { Message } from './message/model/message.model';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nextserve',
    entities: [MqUser, Message],
    synchronize: true,
  }),
  MqModule,
  AuthModule,
  MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
