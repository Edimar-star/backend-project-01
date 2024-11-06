import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function deleteBookAction(id: string): Promise<BookType | null> {
    const results = await BookModel.findByIdAndUpdate(id, { status: false });
    return results;
}

// EXPORT ACTION FUNCTION
export default deleteBookAction;