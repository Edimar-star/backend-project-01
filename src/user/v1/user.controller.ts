import createUserAction from "./create.user.action";
import readUserAction from "./read.user.login.action";
import readUserByIdAction from "./read.user.byId.action";
import updateUserAction from "./update.user.action";
import deleteUserAction from "./delete.user.action";
import createUserReservationAction from "./create.user.reserve.action";
import { UserType } from "./user.model";
import { CreateUserType, CreateUserReservationType, ReadUserType, UpdateUserType, ReadUserByIdType } from "./user.types";

// DECLARE CONTROLLER FUNCTIONS
async function createUser(userData: CreateUserType): Promise<UserType> {
    const createdUser = await createUserAction(userData);
    return createdUser;
}

async function createUserReservation(userData: CreateUserReservationType) {
    const userReservation = await createUserReservationAction(userData)
    return userReservation
}

async function readUser(userData: ReadUserType): Promise<UserType | null> {
    const user = await readUserAction(userData);
    return user;
}

async function readUserById(userData: ReadUserByIdType): Promise<UserType | null> {
    const user = await readUserByIdAction(userData._id);
    if (user && userData.isActive !== undefined && user.isActive !== userData.isActive) {
        return null;
    }
    return user;
}

async function updateUser(userData: { _id: string, data: UpdateUserType }) : Promise<UpdateUserType | null> {
    const updatedUser = await updateUserAction(userData);
    return updatedUser;
}

async function deleteUser(id: string) {
    const deletedUser = await deleteUserAction(id);
    return deletedUser;
}

// EXPORT CONTROLLER FUNCTIONS
export { createUser, createUserReservation, readUser, readUserById, updateUser, deleteUser };
