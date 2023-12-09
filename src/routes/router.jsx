import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";
import BorrowedBooks from "../pages/BorrowedBooks";
import BookCategory from "../pages/BookCategory";
import BookDetails from "../pages/BookDetails";
import UpdateBook from "../pages/UpdateBook";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Read from "../pages/Read";


const router =  createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: 'book/add',
                element: <PrivateRoute><AddBook/></PrivateRoute>
            },
            {
                path: 'books/:category/:isbn/update',
                element: <PrivateRoute><UpdateBook/></PrivateRoute>
            },
            {
                path: 'books',
                element: <PrivateRoute><AllBooks/></PrivateRoute>
            },
            {
                path: `books/:category`,
                element: <PrivateRoute><BookCategory/></PrivateRoute>
            },
            {
                path: `books/:category/:isbn`,
                element: <PrivateRoute><BookDetails/></PrivateRoute>
            },
            {
                path: 'books/borrowed',
                element: <PrivateRoute><BorrowedBooks/></PrivateRoute>
            },
            {
                path: `books/:category/:isbn/read`,
                element: <PrivateRoute><Read/></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login/> 
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    }
])


export default router;