import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
  ){

  }

  async create(createRoleDto: CreateRoleDto) {
    const {name, description, perimissionIds} = createRoleDto;

    const permissions = perimissionIds?.length? 
    await this.permissionRepository.find({
      where: { id: In(perimissionIds)}}): [];

    const role = this.roleRepository.create({
      name, description, permissions
    }) 
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({where: {id}})
    if(!role){
      throw new NotFoundException(`Role con Id ${id} not found`)
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    const {name, description, perimissionIds} = updateRoleDto;

    if(name) role.name= name;
    if(description !== undefined) role.description = description;
    if(perimissionIds){
      role.permissions = await this.permissionRepository.find({
        where: { id: In(perimissionIds)}
      });
    } 
    return this.roleRepository.save(role);
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  async addPermissionToRole(roleId: number, perimissionIds: number[]){
    const role = await this.findOne(roleId);
    const newPermissions = await this.permissionRepository.find({
      where: {id: In(perimissionIds)}
    });
    const exisctingPermissionIds = role.permissions.map((p) => p.id);
    const merged = [
      ...role.permissions,
      ...newPermissions.filter((p) => !exisctingPermissionIds.includes(p.id)),
    ];
    role.permissions = merged;

    return this.roleRepository.save(role);
  }

  async removePermissionFromRole(roleId: number, perimissionIds: number[]){
    const role = await this.findOne(roleId);
    role.permissions = role.permissions.filter(
      (p) => !perimissionIds.includes(p.id),
    );
    return this.roleRepository.save(role);
  }

  async getPermissionOfRole(roleId: number){
    const role = await this.findOne(roleId);
    return role.permissions;
  }
}
