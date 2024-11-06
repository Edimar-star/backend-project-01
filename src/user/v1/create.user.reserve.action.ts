import { UserModel, UserType } from "./user.model";
import { CreateUserReservationType } from "./user.types";

// DECLARE ACTION FUNCTION
async function createUserReservationAction(userData: CreateUserReservationType): Promise<UserType | null> {
    const results = await UserModel.findByIdAndUpdate(
        userData._id,
        {
          $push: {
            history: {
                bookId: userData.history.bookId,
                reservationDate: new Date(),
                returnDate: userData.history.returnDate,
            },
          }
        },
        { new: true }
    );
    return results;
}

// EXPORT ACTION FUNCTION
export default createUserReservationAction;