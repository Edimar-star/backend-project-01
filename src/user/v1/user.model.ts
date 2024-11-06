import { model, Schema } from "mongoose";

type UserRols = "admin" // Tiene todos los permisos
    | "librarian" // Tiene permisos para libros
    | "user" // Usuario normal

type UserHistory = {
    bookId: Schema.Types.ObjectId | string;
    reservationDate: Date;
    returnDate: Date;
}

// DECLARE MODEL TYPE
type UserType = {
    _id: Schema.Types.ObjectId;
    email: string;
    password: string;
    role: UserRols;
    isActive: boolean;
    history: UserHistory[]
};

const ReservationHistorySchema = new Schema<UserHistory>({
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    reservationDate: { type: Date, default: Date.now },
    returnDate: { type: Date, required: true },
});

// DECLARE MONGOOSE SCHEMA
const UserSchema = new Schema<UserType>({
    _id:  { type: Schema.Types.ObjectId, auto: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", required: true },
    isActive: { type: Boolean, default: true },
    history: [ReservationHistorySchema]
} , {
    timestamps: true,
    versionKey: false,
});

// DECLARE MONGO MODEL
const UserModel = model<UserType>("User", UserSchema);

// EXPORT ALL
export { UserModel, UserSchema, UserType, UserRols, UserHistory };