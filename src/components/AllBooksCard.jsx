import { Rating } from '@smastrom/react-rating';
import React from 'react'
import { Link } from 'react-router-dom';

const AllBooksCard = ({book}) => {

  
  return (
    <div className="relative card shadow-2xl gap-2 rounded-sm text-center ">

      <figure className="w-[90%] h-[60%] mx-auto mb-8 md:mb-0">
        <img
          src={book?.image}
          className="w-full h-full"
        />
        <span className="absolute top-4 left-4 badge badge-accent text-white font-medium">
        {book?.category}
      </span>
      </figure>
      <h2 className="card-title text-center justify-center text-sm">
        {book?.name}
      </h2>
      <p>{book?.author}</p>
      
      <div className="flex mx-auto">
        <Rating style={{ width: 100 }} value={book?.rating} readOnly />
      </div>
      <p>Available: {book?.quantity}</p>
      <div className="card-actions justify-center pb-3">
        <Link to={`/books/${book?.category.toLowerCase()}/${book?.isbn}`}>
          <button className="btn btn-xs btn-primary">Details</button>
        </Link>
        <Link to={`/books/${book?.category.toLowerCase()}/${book?.isbn}/update`}>
          <button className="btn btn-xs btn-primary">Update</button>
        </Link>
      </div>
    </div>
  );
}

export default AllBooksCard;