import { BookType, BookHistory } from "./book.model";

export type CreateBookType = Omit<Omit<BookType, "_id">, "history">
export type CreateBookReservationType = { _id: string, history: Omit<BookHistory, "reservationDate"> }
export type ReadBookType = Partial<Omit<Omit<BookType, "_id">, "history">>
export type ReadBookByIdType = { _id: string, isActive: boolean }
export type UpdateBookType = Partial<Omit<Omit<BookType, "_id">, "history">>