import { UserModel, UserType } from "./user.model";
import { ReadUserType } from "./user.types";

// DECLARE ACTION FUNCTION
async function readUserAction(userData: ReadUserType): Promise<UserType | null> {
    const result = await UserModel.findOne(userData);
    return result;
}

// EXPORT ACTION FUNCTION
export default readUserAction;
