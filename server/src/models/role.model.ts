import {Entity, hasMany, model, property} from '@loopback/repository';
import {User, UserWithRelations} from './user.model';

@model({name: 'role',settings: {strict: true}})
export class Role extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  key?: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updatedAt?: Date;

  @hasMany(() => User, {keyTo: 'rolekey'})
  users: User[];

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
  user?: UserWithRelations[];
}

export type RoleWithRelations = Role & RoleRelations;
