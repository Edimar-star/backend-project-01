import { BookModel, BookType } from "./book.model";
import { ReadBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function readBookAction(bookData: ReadBookType): Promise<BookType[] | null> {
    const result = await BookModel.find(bookData).populate({
            path: "history.userId",
            select: "email",
        })
        .exec();
    return result;
}

// EXPORT ACTION FUNCTION
export default readBookAction;
