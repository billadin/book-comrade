import React from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({book}) => {

  return (

    <div className="card shadow-2xl gap-4 rounded-sm dark:bg-white dark:text-black">
      <figure className='relative w-[85%] lg:w-48 h-80 lg:h-60 mx-auto p-2 object-contain'>
        <img 
        src={book?.image}
        className='w-[95%] h-full rounded-md' />
      <span className="absolute top-4 right-4 badge badge-success text-white font-medium">
        {book?.category}
      </span>
      </figure>
      <div className="card-actions justify-center pb-3 dark:bg-white dark:text-black">
        <Link to={`/books/${book?.category.toLowerCase()}/${book?.isbn}`}>
          <button className="btn btn-sm btn-primary">Read</button>
        </Link>
      </div>
    </div>
  );
}

export default BookCard