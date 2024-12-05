import { Table, Column, Model,ForeignKey} from 'sequelize-typescript';
import { User } from './User';
import { Profile } from './Profile';

@Table
export class UserToProfile extends Model {
    @ForeignKey(() => User)
    @Column
    userId:  number;

    @ForeignKey(() => Profile)
    @Column
    profileId: number;
}