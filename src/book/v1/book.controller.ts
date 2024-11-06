import createBookAction from "./create.book.action";
import readBookAction from "./read.book.action";
import readBookByIdAction from "./read.book.byId.action";
import updateBookAction from "./update.book.action";
import deleteBookAction from "./delete.book.action";
import createBookReservationAction from "./create.book.reserve.action";
import { BookType } from "./book.model";
import { CreateBookType, ReadBookType, UpdateBookType, CreateBookReservationType, ReadBookByIdType } from "./book.types";

// DECLARE CONTROLLER FUNCTIONS
async function createBook(bookData: CreateBookType): Promise<BookType> {
    const createdBook = await createBookAction(bookData);
    return createdBook;
}

async function createBookReservation(bookData: CreateBookReservationType) {
    const bookReservation = await createBookReservationAction(bookData)
    return bookReservation
}

async function readBook(bookData: ReadBookType): Promise<BookType[] | null> {
    const books = await readBookAction(bookData);
    return books;
}

async function readBookById(bookData: ReadBookByIdType): Promise<BookType | null> {
    const book = await readBookByIdAction(bookData._id);
    if (book && bookData.isActive !== undefined && book.isActive !== bookData.isActive) {
        return null;
    }
    return book;
}

async function updateBook(bookData: { _id: string, data: UpdateBookType }) : Promise<UpdateBookType | null> {
    const updatedBook = await updateBookAction(bookData);
    return updatedBook;
}

async function deleteBook(id: string) {
    const deletedBook = await deleteBookAction(id);
    return deletedBook;
}

// EXPORT CONTROLLER FUNCTIONS
export { createBook, createBookReservation, readBook, readBookById, updateBook, deleteBook };