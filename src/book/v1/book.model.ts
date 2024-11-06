// src/infrastructure/database/models/BookModel.ts
import { Schema, model, Document } from "mongoose";

type BookHistory = {
  userId: Schema.Types.ObjectId | string;
  reservationDate: Date;
  returnDate: Date;
}

type BookType = {
    _id: Schema.Types.ObjectId,
    title: string;
    author: string;
    genre: string;
    publicationDate: Date;
    publisher: string;
    isActive: boolean;
    isAvailable: boolean;
    history: BookHistory[];
}

const BookHistorySchema = new Schema<BookHistory>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reservationDate: { type: Date, default: Date.now },
    returnDate: { type: Date, required: true },
});

const BookSchema = new Schema<BookType>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    publisher: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },
    history: [BookHistorySchema]
});

const BookModel = model<BookType>("Book", BookSchema);

// EXPORT ALL
export { BookModel, BookSchema, BookType, BookHistory };