import { PartialType } from '@nestjs/mapped-types';
import { CreateMqDto, CreateAvataro } from './create-mq.dto';

export class UpdateMqDto extends PartialType(CreateMqDto) {
  id: number;
}

export class UpdataAvataro extends PartialType(CreateAvataro) {
  id: number;
}