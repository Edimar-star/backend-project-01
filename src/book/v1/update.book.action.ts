import { BookModel, BookType } from "./book.model";
import { UpdateBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function updateBookAction(bookData: { _id: string, data: UpdateBookType }): Promise<BookType | null> {
    const results = await BookModel.findByIdAndUpdate(bookData._id, bookData.data);
    return results;
}

// EXPORT ACTION FUNCTION
export default updateBookAction;
