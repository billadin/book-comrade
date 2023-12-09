import React from 'react'
import { Link } from 'react-router-dom';

const PopularCard = ({book}) => {

  return (
    <div className="group relative block bg-black rounded-md">
      <img
        src={book?.image}
        className="absolute inset-0 h-full w-full object-fill opacity-60 transition-opacity group-hover:opacity-40 rounded-md"
      />

      <div className="relative p-4 sm:p-6 lg:p-8 text-center">
        <h3 className="absolute top-[40%] left-[30%] sm:left-[25%] mx-auto text-3xl font-medium tracking-widest text-white">
          {book?.category}
        </h3>
        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white">
              <Link to={`/books/${book?.category.toLowerCase()}`}>
                <button className="btn btn-md">Browse Collection</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularCard