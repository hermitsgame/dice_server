
import { Model, Table, Column, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript'
import User from './User';

@Table({
	tableName : 'user_log'
})
export default class UserLog extends Model<UserLog> {
	@Column({
		type : DataType.ENUM('transfer'),
		defaultValue : 'transfer',
		allowNull : false
	})
	type : string

	@Column({
		allowNull : false
	})
	account : string

	@Column({
		allowNull : false
	})
	target : string

	@Column({
		allowNull : false,
	})
	amount : number
}

