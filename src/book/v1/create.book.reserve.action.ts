import { BookModel, BookType } from "./book.model";
import { CreateBookReservationType } from "./book.types";

// DECLARE ACTION FUNCTION
async function createBookReservationAction(bookData: CreateBookReservationType): Promise<BookType | null> {
    const results = await BookModel.findByIdAndUpdate(
        bookData._id,
        {
          $push: {
            history: {
                userId: bookData.history.userId,
                reservationDate: new Date(),
                returnDate: bookData.history.returnDate,
            },
          },
          $set: { isAvailable: false },
        },
        { new: true }
    );
    return results;
}

// EXPORT ACTION FUNCTION
export default createBookReservationAction;