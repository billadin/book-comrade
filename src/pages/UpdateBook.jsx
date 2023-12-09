import { Rating } from '@smastrom/react-rating';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { AuthContext } from '../provider/AuthProvider';

const UpdateBook = () => {
  const navigate = useNavigate();
  const {category, isbn} = useParams()
  const axios = useAxios();
  const {user} = useContext(AuthContext)
const username = user.email;


  const success = (msg) => {
    enqueueSnackbar(msg, {
      preventDuplicate: true,
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  const fail = (msg) => {
    enqueueSnackbar(msg, {
      preventDuplicate: true,
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const getSingleBook = async () => {
    const res = await axios.post(`/books/${category}/${isbn}`, {username})
    return res.data;
  }

  const {
    isPending,
    isError,
    error,
    data : book,
  } = useQuery({
    queryKey: ["book"],
    queryFn: getSingleBook
  });

  const handleUpdateBook = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const author = form.author.value;
    const updatedCategory = form.category.value;
    const image = form.image.value;
    const rating = form.rating.value;

    const {description1, description2, isbn, lan, pages, published, quantity, borrowedAt, returnBy} = book;

    const updatedBook = {
      description1,
      description2,
      isbn,
      lan,
      pages,
      published,
      quantity,
      borrowedAt,
      returnBy,
      name,
      author,
      image,
      category: updatedCategory,
      rating,
    };

    axios.patch(`/books/${category}/update/${isbn}`, {updatedBook, updatedCategory, username})
    .then(res=> {

      const data = res.data
      if( data?.addItem && data?.allItem && data?.removeItem) {
      if(data?.addItem?.acknowledged===true || data?.allItem?.modifiedCount ===1 || data?.removeItem?.deletedCount===1) {
        success('Book updated successfully!')
      }
      navigate(`/books/${updatedCategory.toLowerCase()}/${isbn}/update`)
    } else {
        fail(`${data?.msg}`)
    }
    })
    .catch(e=> {
      fail(`Failed: ${e.message}`)
      console.log(e)}) 
    }


  return (
    <div className="py-16 w-[90%] mx-auto my-20">
      <section className="flex flex-col mx-auto overflow-hidden bg-white rounded-lg shadow-2xl  md:flex-row">
          <div className="md:flex md:items-center md:justify-around md:w-1/2  bg-info p-4">
            <div>

              <img
                src={book?.image}
                className="mx-auto object-cover rounded-xl w-[95%] max-h-80"
              />
            </div>
            <div className="px-6 py-6 md:px-8 md:py-0">
              <h2 className="text-xl font-bold ">
                Book Information
              </h2>
              <p className="mt-2 text-sm  font-bold">Name: <span className='text-secondary'>{book?.name}</span></p>
              <p className="mt-2 text-sm  font-semibold">
                <span className='font-bold'>Category: </span><span className='text-secondary'>{book?.category}</span>
              </p>
              <div className="flex gap-4 mt-2 text-sm ">
              <span className='font-bold'>Rating: </span>
                <Rating
                  style={{ width: 100 }}
                  value={book?.rating}
                  readOnly
                  className="inline-flex "
                />
              </div>
              <p className="mt-2 text-sm  font-semibold">Author: <span className='text-secondary'>{book?.author}</span></p>
              <p className="mt-2 text-sm  font-semibold">ISBN: <span className='text-secondary'>{book?.isbn}</span></p>
            </div>
          </div>
      <div className="max-w-4xl p-4 md:p-6 mx-auto bg-white rounded-md md:rounded-r-md md:w-1/2 w-[95%]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update Book
        </h2>
        <form onSubmit={handleUpdateBook}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

            <div>
              <label className="text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                required
                name='name'
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>


            <div>
              <label className="text-gray-700" htmlFor="author">
                Author
              </label>
              <input
                required
                name='author'
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="rating">
                Rating
              </label>
              <input
                required
                name='rating'
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="category">
                Category
              </label>
              <select 
              required
              name="category"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring">
                <option value="">Select a category</option>
                <option value="Business">Business</option>
                <option value="Comics">Comics</option>
                <option value="Crime">Crime</option>
                <option value="Children">Children</option>
                <option value="History">History</option>
                <option value="Sci-Fi">Sci-Fi</option>
              </select>
            </div>

            <div>
              <label className="" htmlFor="file">
                Image
              </label>
              <input
                required
                name='image'
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

          </div>


          <div className="flex justify-center mt-6">

            <button
              type="submit"
              title="Start buying"
              className="w-full py-3 px-6 text-center rounded-full transition bg-info active:bg-primary sm:w-max"
            >
              <span className="block text-gray-800 font-semibold text-sm">
                Update
              </span>
            </button>
          </div>
        </form>
      </div>
      </section>

    </div>
  );
}

export default UpdateBook;