import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
export declare class RoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    create(createRoleDto: CreateRoleDto): string;
    findAll(): Promise<Role[]>;
    findOne(id: number): string;
    update(id: number, updateRoleDto: UpdateRoleDto): string;
    remove(id: number): string;
}
