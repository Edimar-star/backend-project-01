import { UserModel, UserType } from "./user.model";
import { UpdateUserType } from "./user.types";

// DECLARE ACTION FUNCTION
async function updateUserAction(userData: { _id: string, data: UpdateUserType }): Promise<UserType | null> {
    const results = await UserModel.findByIdAndUpdate(userData._id, userData.data);
    return results;
}

// EXPORT ACTION FUNCTION
export default updateUserAction;
