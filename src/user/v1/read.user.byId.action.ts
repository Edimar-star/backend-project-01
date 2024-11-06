import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION
async function readUserByIdAction(id: string): Promise<UserType | null> {
    const result = await UserModel.findById(id).populate({
            path: "history.bookId",
            select: "title",
        })
        .exec();
    return result;
}

// EXPORT ACTION FUNCTION
export default readUserByIdAction;