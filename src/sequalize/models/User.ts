import { Table, Column, DataType, Model, ForeignKey, BelongsTo, BelongsToMany} from 'sequelize-typescript';
import {Team} from "./Team";
import { Profile } from './Profile';
import { UserToProfile } from './UserToProfile';

@Table({
    timestamps: true ,
    tableName: "User",
 })
export class User extends Model {
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
 
   @Column({
     type: DataType.STRING,
     allowNull: false,
   })
   password!: string;
  
   // One to many
   @ForeignKey(() => Team)
   @Column
   teamId: number;
 
   @BelongsTo(() => Team)
   team: Team;

   //Many to Many
   @BelongsToMany(() => Profile, () => UserToProfile)
   profile: Array<Profile & {UserToProfile: UserToProfile}>;
 }
