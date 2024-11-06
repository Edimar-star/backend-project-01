import { BookModel, BookType } from "./book.model";
import { CreateBookType } from "./book.types";

// DECLARE ACTION FUNCTION
async function createBookAction(bookData: CreateBookType): Promise<BookType> {
    const results = await BookModel.create(bookData);
    return results;
}

// EXPORT ACTION FUNCTION
export default createBookAction;