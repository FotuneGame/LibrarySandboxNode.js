import { Table, Column, DataType, Model, BelongsToMany} from 'sequelize-typescript';
import { User } from './User';
import { UserToProfile } from './UserToProfile';


@Table({
    timestamps: true ,
    tableName: "Profile",
 })
export class Profile extends Model{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;
    
    //Many to Many
    @BelongsToMany(() => User, () => UserToProfile)
    users: Array<User & {UserToProfile: UserToProfile}>;
}