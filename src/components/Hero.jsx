import React from 'react'
import banner from '../assets/hero-banner-4.jpg'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <div
        className="hero min-h-screen bg-fill bg-no-repeat"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">
              Simplest Way To
              <br /> Enjoy Books
            </h1>
            <p className="mb-5 text-white">
              Choose your desired book from thousand of collections, add you
              book, borrow book.
            </p>

            <div className="flex space-x-4 justify-center">
              <Link to={'/'}>
              <button
                type="button"
                className="btn btn-primary"
              >
                <span className="block text-white font-semibold">
                  Get Started
                </span>
              </button>
              </Link>
              <Link to={'/books'}>
              <button
                type="button"
                className="btn btn-accent text-white"
              >
                <span className="block font-semibold ">
                  Browse All Books
                </span>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero