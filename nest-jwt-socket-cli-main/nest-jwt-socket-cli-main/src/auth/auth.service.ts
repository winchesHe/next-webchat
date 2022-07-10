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
    // 校验是否存在用户名
    const user = await this.userRepository.findOneBy({username: data.username});
    if (!user) {
      return { code: 1, msg: '用户未注册', data: '' };
    }

    // 校验是否输入正确的密码
    const password = await this.userRepository.findOneBy({username: data.username, password: data.password});
    if (!password) {
      return { code: 1, msg: '密码错误', data: '' };
    }

    if (!passwordVerify(data.password) || !nameVerify(data.username)) {
      return { code: ResCode.FAIL, msg: '注册校验不通过！', data: '' };
    }
    
    user.password = data.password;
    const payload = { userId: user.id, password: data.password };
    return {
      code: 0,
      msg: '登录成功',
      data: {
        user: user,
        token: this.jwtService.sign(payload)
      },
    };
  }

  // 注册
  async register(user: MqUser): Promise<any> {
    const isHave = await this.userRepository.findOneBy({username: user.username});
    if(isHave) {
      return {code: 200, msg:'用户名重复', data: '' };
    }
    if(!passwordVerify(user.password)) {
      return {code: 1, msg:'密码不符合要求', data: '' };
    }

    const newUser = await this.userRepository.save(user);
    const payload = {userId: newUser.id, password: newUser.password};
    return {
      code: 0,
      msg:'注册成功',
      data: { 
        user: newUser,
        token: this.jwtService.sign(payload)
      },
    };
  }
}