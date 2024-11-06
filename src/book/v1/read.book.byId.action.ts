import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function readBookByIdAction(id: string): Promise<BookType | null> {
    const result = await BookModel.findById(id).populate({
            path: "history.userId",
            select: "email",
        })
        .exec();
    return result;
}

// EXPORT ACTION FUNCTION
export default readBookByIdAction;