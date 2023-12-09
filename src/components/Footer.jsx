import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full dark:bg-gray-900 py-16">

      <div className="md:px-12 lg:px-28">

        <div className="container m-auto space-y-6 text-gray-600 dark:text-gray-300">
          <h2 className='text-center text-3xl font-bold'>Book Comrade</h2>
          <ul
            role="list"
            className="flex flex-col items-center justify-center gap-4 py-4 sm:flex-row sm:gap-8"
          >
            <li role="listitem">
              <a href="/" className="hover:text-primary">
                Home
              </a>
            </li>
            <Link to={'/books'}>
            <li role="listitem">
              <p className="hover:text-primary">
                All Books
              </p>
            </li>
            </Link>
            <Link to={'/books/borrowed'}>
            <li role="listitem">
              <p className="hover:text-primary">
                Borrowed Books
              </p>
            </li>
            </Link>
            <Link to={'/register'}>
            <li role="listitem">
              <p className="hover:text-primary">
                Get Started
              </p>
            </li>
            </Link>
          </ul>
          <div className="text-center">
            <span className="text-sm tracking-wide">
              Copyright © Library <span id="year" /> | All right reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer