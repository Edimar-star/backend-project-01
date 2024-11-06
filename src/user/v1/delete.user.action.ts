import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION
async function deleteUserAction(id: string): Promise<UserType | null> {
    const results = await UserModel.findByIdAndUpdate(id, { isActive: false });
    return results;
}

// EXPORT ACTION FUNCTION
export default deleteUserAction;
