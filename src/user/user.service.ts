import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //console.log(createUserDto)
    const user = this.userRepository.create(createUserDto);
    //console.log(user)
    return this.userRepository.save(user).catch((err) => err);
  }

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .select([
        'user.name',
        'user.email',
        'user.phoneNumber',
        'user.station',
        'role.role',
      ])
      .getMany();
  }

  findOneByEmail(email) {
    console.log('email: ' + email);
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .addSelect(['user.password', 'role.role'])
      .where('user.email = :email', { email: email })
      .getOne();
  }

  findOne(id: number) {
    const userDetail = this.userRepository.findOne(id);
    const user = userDetail.then((resp) => ({
      name: resp.name,
      email: resp.email,
      phoneNumber: resp.phoneNumber,
      station: resp.station,
      role: resp.role.role,
    }));

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
