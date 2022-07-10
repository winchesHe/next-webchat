import { Injectable } from '@nestjs/common';
import { CreateMqDto } from './dto/create-mq.dto';
import { UpdateMqDto, UpdataAvataro } from './dto/update-mq.dto';
import { MqUser } from './entity/mq.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MqService {
  constructor(
    @InjectRepository(MqUser)
    private readonly usersRepository: Repository<MqUser>
  ) { }

  create(updateMqDto: CreateMqDto): Promise<MqUser> {
    const user = new MqUser();
    user.username = updateMqDto.username
    user.password = updateMqDto.password
    return this.usersRepository.save(user);
  }

  createAvataro(id: number, avataro: UpdataAvataro) {
    return this.usersRepository.update(id, avataro);
  }

  findAll(): Promise<MqUser[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<MqUser[]> {
    return this.usersRepository.findBy({username});
  }

  update(id: number, updateMqDto: UpdateMqDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateMqDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
