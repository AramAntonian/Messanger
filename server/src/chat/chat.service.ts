import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { ChatDto } from './dto/chat.dto';
import { Repository } from 'typeorm';
import { CreateChat } from './dto/createChat.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    private userService: UserService,
  ) {}

  async getChats(user: number | string) {
    const userChat = await this.userService.findOne(user, '', ['chats', 'chats.users']);
    return userChat?.chats;
  }

  async addChat(data: CreateChat) {
    const users: UserDto[] = [];

    for (const el of data.users) {
      const user = await this.userService.findOne(el, '');
      if (user) {
        users.push(user);
      }
    }

    const isGroup = users.length > 2;
    const name = data.name;
    const chat: ChatDto = { users, name, isGroup };

    return await this.chatRepo.save(chat);
  }

  async getMessages(id: number) {
    const chat = await this.chatRepo.findOne({
      where: { id },
      relations: ['messages', 'messages.sender'],
    });
    if(chat?.messages){
     chat.messages.sort((a,b) => a.id - b.id)
    }
    return chat?.messages;
  }

  async newMessage(message: CreateMessageDto) {
    const sender = await this.userService.findOne(message.sender);
    const chat = await this.chatRepo.findOne({
      where: { id: message.chat },
      relations: ['users'],
    });
    if (!sender && !chat) {
      return null;
    }
    const newMessage: MessageDto = {
      sender: sender!,
      chat: chat!,
      created_at: message.created_at,
      message: message.message,
      type: message.type,
    };
    return await this.messageRepo.save(newMessage);
  }

  async getChat(id: number, rels?: string[]) {
    return this.chatRepo.findOne({ where: { id }, relations: rels });
  }
}
