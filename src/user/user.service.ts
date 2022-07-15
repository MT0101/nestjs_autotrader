import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { CreateUserResponse } from "../interfaces/user";
import { hashPwd } from "../utils/hash-pwd";


@Injectable()
export class UserService {

  filter(user: User): CreateUserResponse {
    const {id, name, email} = user;
    return {id, name, email};
  }


  async create(newUser: CreateUserDto): Promise<CreateUserResponse> {
    const user = new User();
    user.name = newUser.name;
    user.email = newUser.email;
    user.pwdHash = hashPwd(newUser.password);
    await user.save();
    return this.filter(user);
  }

  async findAll() {
    return await User.find();
  }

  async findOne(id: string): Promise<User> {
    if (!id) {
      return null;
    }
    return await User.findOne({where: {id}});
  }

  async update(id: string, attrs: Partial<UpdateUserDto>) {
    const user = await User.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    await user.save();
  }

  async remove(id: string) {
    const user = await User.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await user.remove();
  }
}
