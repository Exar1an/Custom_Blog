import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UserRoles } from '../roles/user-roles.model'

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) { }


    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('Writer')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: {
                all: true
            }
        });
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email
            },
            include: {
                all: true
            }
        })
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    };

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const roles = await this.roleService.getUserRoles(user.id)
        const isModerator = roles.some(role => role.roleId === 1); // role number 1 is moderator
        //You can replace it more grammatically, but so as not to linger now until it is so
        if (isModerator) {
            throw new HttpException('No access to ban', HttpStatus.FORBIDDEN)
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }







}