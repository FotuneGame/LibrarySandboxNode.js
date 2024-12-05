import { Table, Column, HasMany, Model} from 'sequelize-typescript';
import { User } from './User';

@Table
export class Team extends Model {
  @Column
  name: string;

  @HasMany(() => User)
  users: User[];
}