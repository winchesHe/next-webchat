import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nameVerify, passwordVerify } from 'src/common/tool/utils';
import { MqUser } from '../mq/entity/mq.entity';
import { ResCode } from 'src/common/constant/rescode';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(MqUser)
    private userRepository: Repository<MqUser>,
    private readonly jwtService: JwtService
  ) {}

  async login(data: MqUser): Promise<any> {
    const user = await this.userRepository.findOneBy({username:data.username, password: data.password});
    if (!user) {
      return { code: 1, msg: '密码错误', data: '' };
    }
    if (!passwordVerify(data.password) || !nameVerify(data.username)) {
      return { code: ResCode.FAIL, msg: '注册校验不通过！', data: '' };
    }
    
    user.password = data.password;
    const payload = { userId: user.id, password: data.password };
    return {
      msg: '登录成功',
      data: {
        user: user,
        token: this.jwtService.sign(payload)
      },
    };
  }
}