import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Chat } from './entities/chat.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [UserModule, TypeOrmModule.forFeature([Message, Chat]), AuthModule],
})
export class ChatModule {}
