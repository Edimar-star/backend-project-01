import { Schema } from "mongoose";
import { UserType, UserHistory } from "./user.model";

export type CreateUserType = Omit<Omit<UserType, "_id">, "history">
export type CreateUserReservationType = { _id: Schema.Types.ObjectId | string, history: Partial<UserHistory> }
export type ReadUserType = Partial<Omit<Omit<Omit<UserType, "_id">, "role">, "history">>
export type ReadUserByIdType = { _id: string, isActive: boolean }
export type UpdateUserType = Omit<Partial<UserType>, "_id">