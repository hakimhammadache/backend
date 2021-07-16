import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<{
        name: string;
        email: string;
        phoneNumber: string;
        station: string;
        role: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): string;
}
