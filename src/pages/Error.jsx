import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div className="flex flex-col items-center">
      {/* logo - start */}
      <a
        className="mb-8 inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
        aria-label="logo"
      >
        Oops! 
      </a>
      {/* logo - end */}
      <p className="mb-4 text-sm font-semibold  text-indigo-500 md:text-base">
        404 Error Encountered
      </p>
      <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
        Page not found
      </h1>
      <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
        The page you’re looking for doesn’t exist.
      </p>
      <Link to={'/'}>
      <p
        className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
      >
        Return to homepage
      </p>
      </Link>
    </div>
  </div>
</div>

    </div>
  )
}

export default Error