export interface IMessageOut {
	action: string
	name?: string
	metric?: string
	userName?: string
	userId?: string
	roomId?: string
	content?: string
}

export interface IUser {
	id: string
	name: string
}

export interface IRoom {
	id: string
	name: string
	metric: string
	users: IUser[]
}