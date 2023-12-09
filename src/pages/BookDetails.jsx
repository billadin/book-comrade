import { Rating } from '@smastrom/react-rating';
import React, { useContext, useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { enqueueSnackbar } from 'notistack';
import { Button, Modal } from 'flowbite-react';

const BookDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const {user} = useContext(AuthContext);
    const name = user?.displayName || "";
    const username = user.email;
    const email = user?.email;
    const [book, setBook] = useState([])
    const axios = useAxios()
    const {category, isbn} = useParams()
    const [isAdded, setIsAdded] = useState(false)

    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 1);
    const disabledDate = todayDate.toISOString().split('T')[0];

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


    const handleBorrow = async (e) => {
      e.preventDefault();
      const {_id , ...borrowedBook} = book;
      const form = e.target;
      const returnByDate = form.returnBy.value;
      const formattedDate = new Date(returnByDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      let returnBy = formattedDate.split("/").join("-");
      console.log(returnBy)
      borrowedBook.returnBy = returnBy;
      console.log(borrowedBook)

      const username = user.email;
      axios.patch(`book/${book?.isbn}/quantity/update`, {category, borrowed: true, username})
      .then(res => {
        console.log(res.data)
        if(res.data?.allItem?.modifiedCount===1 || res.data?.item?.modifiedCount===1) {
          success('Book borrowed successfully!')
          setOpenModal(false)
          setIsAdded(true)
        }else {
          fail('Something went wring, try again later')
          setOpenModal(false)
        }
      })
      .catch(e => {
        fail(`Something went wrong`)
        fail(e.message)

      })

      axios.post(`user/borrow`, {username, borrowed: borrowedBook})
      .then(res => {
      })
      .catch(e => console.log(e))

    }



  useEffect(()=> {
    
    if (user || isAdded ) {
      axios.post(`books/${category}/${isbn}`, {username})
    .then(res => {
      console.log(res.data?.quantity)
      setBook(res.data);
    })
    .catch(e => console.log(e));

  
      axios.post(`user/info`, {username, isbn: isbn})
      .then(res => {
        console.log(res.data)
        setIsAdded(res?.data?.itemExist);
      })
      .catch(e => console.log(e));
  }
}, [user, isAdded, openModal])


  return (
    <div className=" lg:w-[80%] px-5 pb-24 mx-auto my-20">
      <div className="flex flex-col  lg:flex-row lg:space-x-12">
        <div className="order-first w-full max-w-screen-sm m-auto mt-12 lg:w-1/4 lg:order-first">
          <div className="transition duration-500 ease-in-out transform bg-white  rounded-lg">
            <div className="py-2 mb-4">
              <img src={book?.image} className="rounded-md mx-auto" />
            </div>

            <div className="flex flex-col my-4 mx-auto items-center">
              <p>Rating</p>
              <Rating style={{ width: 100 }} value={book?.rating} readOnly />
            </div>

          <div className="flex flex-col gap-4 w-[60%] mx-auto">
            {
              book?.quantity === 0 || isAdded === true ? <Button disabled={true}>
              <span>Borrow</span></Button> : 
              <Button onClick={() => setOpenModal(true)} disabled={false}>Borrow</Button>
            }
          <Link to={`/books/${category}/${isbn}/read`}>
          <button className='btn btn-success w-full bg-amber-600 text-white'>Read</button>
          </Link>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Borrow this book</Modal.Header>
          <Modal.Body>
              <form onSubmit={handleBorrow}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                  <div>
                    <label className="text-gray-700" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      required
                      disabled
                      value={name}
                      name='name'
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700" htmlFor="name">
                      Your Email
                    </label>
                    <input
                      required
                      disabled
                      value={email}
                      name='email'
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                  </div>


                  <div>
                    <label className="" htmlFor="file">
                      Select a book return date
                    </label>
                    <input
                      required
                      min={disabledDate}
                      name='returnBy'
                      type="date"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                  </div>

                </div>
                <button className='btn btn-secondary mx-auto flex mt-6'>Borrow</button>

              </form>
            </Modal.Body>
          </Modal>
          </div>
          </div>
        </div>

        <div className="w-full px-4 mt-12 prose lg:px-0 lg:w-3/4">
          <div className="mb-5 border-b border-gray-200">
            <div className="flex flex-col flex-wrap items-baseline -mt-2">
              <h5>{book?.name}</h5>
              <p className="mt-1 ml-2">{book?.author}</p>
              <div className="flex flex-col my-4">
                <p>Rating</p>
                <Rating
                  style={{ width: 200 }}
                  value={book?.rating}
                  readOnly
                  className="text-4xl"
                />
              </div>
            </div>
          </div>
          <h1 className="text-lg font-medium mb-4">{book?.description1}</h1>
          <p className="text-base mb-4">
            {book?.description2}
          </p>
          <br/>
          <p className="text-base mb-4">
            {book?.description1}
          </p>
          <div className="badge badge-lg badge-accent text-white font-medium mb-4">
            {book?.category}
          </div>
          <p className="mb-2 text-gray-400">Total Page: 363</p>
          <p className="mb-10 text-gray-400">Published On: 20 Dec, 2001</p>

          <div className="mb-14">
            <h3 className="font-semibold mb-2">Details:</h3>
            <p className="mb-2 text-gray-600">Format: E-Book</p>
            <p className="mb-2 text-gray-600">Language: {book?.lan}</p>
            <p className="mb-2 text-gray-600">
              Published: {book?.published} by <span className='font-semibold'>{book?.author}</span>
            </p>
          </div>

          <div className="w-[90%] lg:w-[60%]">
            <h2 className="text-lg font-semibold text-center xl:text-start">About Author</h2>
            <div className="flex flex-col gap-8 xl:gap-0 xl:flex-row justify-between lg:items-center py-2 my-4">

              <div className='flex'>
                <img
                  src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/nophoto/user/u_700x933.png"
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{book?.author}</p>
                  <p className="text-sm text-gray-500">Books: {book?.quantity}</p>
                </div>
              </div>

              <button className="btn btn-success btn-md w-40">See All Books</button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookDetails