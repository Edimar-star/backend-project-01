import { Router, Request, Response } from "express";
import { AuthMiddleware } from "../../middleware/auth";
import { RolesMiddleware } from "../../middleware/roles";
import { CreateBookReservationType, CreateBookType, ReadBookType, UpdateBookType } from "./book.types";
import { createBook, createBookReservation, deleteBook, readBook, readBookById, updateBook } from "./book.controller";
import { createUserReservation, readUserById } from "../../user/v1/user.controller";

// INIT ROUTES
const bookRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function PostBook(request: Request, response: Response) {
    const { title, author, genre, publicationDate, publisher } : CreateBookType = request.body
    if (!title || !author || !genre || !publicationDate || !publisher) {
        response.status(400).json({ message: "Missing fields" })
        return;
    }

    try {
        const book = await createBook(request.body);
        response.status(201).json({ message: "Success.", book });
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

async function PostReserveBook(request: Request, response: Response) {
    const { _id: bookId, history } : CreateBookReservationType = request.body
    if (!bookId || !history || !history.userId || !history.returnDate) {
        response.status(400).json({ message: "Missing fields" })
        return;
    }

    try {
        const user = await readUserById({ _id: history.userId as string, isActive: true })
        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }

        const book = await readBookById({ _id: bookId as string, isActive: true })
        if (!book) {
            response.status(404).json({ message: "Book not found" });
            return;
        }

        if (!book.isAvailable) {
            response.status(404).json({ message: "Book is not Available" });
            return;
        }

        const { userId, returnDate } = history
        const bookReservation = await createBookReservation({ _id: bookId, history });
        const reservationDate = bookReservation?.history[bookReservation.history.length - 1].reservationDate
        const userReservation = await createUserReservation({ _id: userId, history: { bookId, reservationDate, returnDate } })
        response.status(201).json({ message: "Success.", reserve: userReservation?.history[userReservation.history.length - 1] });
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

async function GetOneBook(request: Request, response: Response) {
    const bookId = request.params.id
    const { isActive } = request.query as any as { isActive: boolean }
  
    try {
        const book = await readBookById({ _id: bookId, isActive: isActive ?? true });
        if (!book) {
            response.status(404).json({ message: "Book not found" });
            return;
        }

        response.status(200).json({ message: "Success.", book });
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

async function GetBooks(request: Request, response: Response) {
    const bookFilters = request.query as any as ReadBookType
    if (bookFilters.isActive === undefined) bookFilters.isActive = true
    else if (!bookFilters.isActive) delete bookFilters.isActive
  
    try {
        const books = await readBook(bookFilters);
        if (!books) {
            response.status(404).json({ message: "Books not found" });
            return;
        }

        response.status(200).json({ message: "Success.", books });
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

async function GetBookHistory(request: Request, response: Response) {
    const bookId = request.params.id
    const { isActive } = request.query as any as { isActive: boolean }

    try {
        const book = await readBookById({ _id: bookId, isActive: isActive ?? true });
        if (!book) {
            response.status(404).json({ message: "Book not found" });
            return;
        }

        response.status(200).json({ message: "Success.", history: book.history });
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

async function UpdateBook(request: Request, response: Response) {
    const bookId = request.params.id
    try {
        const book = await updateBook({ _id: bookId, data: request.body as UpdateBookType});
        if (!book) {
            response.status(404).json({ message: "Book not found" });
            return;
        }
        response.status(201);
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

async function DeleteBook(request: Request, response: Response) {
    const bookId = request.params.id

    try {
        const book = await deleteBook(bookId);
        if (!book) {
            response.status(404).json({ message: "Book not found" });
            return;
        }
        
        response.status(204);
    } catch (error) {
        response.status(500).json({ message: "Failure", information: (error as any).toString() })
    }
}

// DECLARE ENDPOINTS
bookRoutes.get("/all", GetBooks);
bookRoutes.get("/one/:id", GetOneBook);
bookRoutes.post("/", AuthMiddleware, RolesMiddleware("admin", "librarian"), PostBook);
bookRoutes.post("/reserve", AuthMiddleware, RolesMiddleware("admin", "librarian", "user"), PostReserveBook)
bookRoutes.get("/history/:id", AuthMiddleware, RolesMiddleware("admin", "librarian"), GetBookHistory);
bookRoutes.put("/:id", AuthMiddleware, RolesMiddleware("admin", "librarian"), UpdateBook)
bookRoutes.delete("/:id", AuthMiddleware, RolesMiddleware("admin", "librarian"), DeleteBook)

// EXPORT ROUTES
export default bookRoutes;