import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<User[]>;
    findOneByEmail(email: any): Promise<User>;
    findOne(id: number): Promise<{
        name: string;
        email: string;
        phoneNumber: string;
        station: string;
        role: string;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
