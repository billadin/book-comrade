import { Rating } from '@smastrom/react-rating';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';


const BookCardFull = ({book}) => {

  return (
    <div className="relative card shadow-2xl gap-4 rounded-md text-center">

      <figure className="w-full h-60 mx-auto">
        <img
          src={book?.image}
          className="w-full h-full"
        />
      </figure>
      <h2 className="card-title text-center justify-center text-sm px-2">
        {book?.name}
      </h2>
      <p>{book?.author}</p>
      <div className="absolute top-4 left-4 bg-red-700 badge badge-accent text-white font-medium">
        {book?.category}
      </div>
      <div className="flex mx-auto">
        <Rating style={{ width: 100 }} value={book?.rating} readOnly />
      </div>
      <div className="card-actions justify-center pb-3">
        <Link to={`/books/${book?.category.toLowerCase()}/${book?.isbn}`}>
          <button className="btn btn-sm btn-primary">Details</button>
        </Link>
      </div>
    </div>
  );
}

export default BookCardFull;