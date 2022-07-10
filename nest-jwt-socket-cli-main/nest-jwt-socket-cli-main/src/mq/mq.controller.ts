import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreateMqDto } from './dto/create-mq.dto';
import { UpdataAvataro } from './dto/update-mq.dto'
import { MqUser } from './entity/mq.entity';
import { MqService } from './mq.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: MqService) {}

  @Post('login')
  create(@Body() createUserDto: CreateMqDto): Promise<MqUser> {
    return this.usersService.create(createUserDto);
  }

  @Post('login/avataro')
  createAvataro(@Body() avataro: UpdataAvataro): Promise<UpdateResult> {
    return this.usersService.createAvataro(avataro.id, avataro);
  }

  @Get()
  findAll(): Promise<MqUser[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('id') username: string): Promise<MqUser[]> {
    return this.usersService.findOne(username);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}