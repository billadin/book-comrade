import AllBooksCard from '../components/AllBooksCard';
import { nanoid } from 'nanoid';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const AllBooks = () => {
  const {user} = useContext(AuthContext);
  const axios = useAxios();
  const [allBooks, setAllBooks] = useState([]);
  const [available, setAvailable] = useState([])
  const [isShowAll, setIsShowAll] = useState(true)
  const username = user.email;
  const [isLoading, setIsLoading] = useState(false)

  const handleAvailable = () => {
    axios.post(`/books/quantity`, {username})
    .then(res => {
      setAvailable(res?.data?.result)
      setIsShowAll(false);
    })
    .catch(e => console.log(e))
  }

  const handleAll = () => {
    setIsShowAll(true);
  }

  useEffect(()=> {
    setIsLoading(true)
    if(user) {
      axios.post('/books', { username })
      .then(res => {
        setAllBooks(res?.data?.result)
      })
      .catch(e => console.log(e))
      setIsLoading(false)
    }
  },[])

  return (
    <div className="w-[80%] mx-auto my-40">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          <h1 className="text-4xl font-medium">All Books</h1>
          <div className='md:text-left text-center'>
            <span className="btn btn-ghost normal-case hover:bg-white">Filter:</span>
            <div className="join">
              <button
               onClick={handleAvailable}
               className="btn join-item normal-case border-gray-300">Only Available</button>
              <button
               onClick={handleAll}
               className="btn join-item normal-case border-gray-300">Show All</button>
            </div>
          </div>
        </div>

        {
          isLoading ?
          <Loading/> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 my-14">
          {
            isShowAll ?
            allBooks?.map((book) => (<AllBooksCard key={nanoid(10)} book={book} />)) :
            available?.map((book) => (<AllBooksCard key={nanoid(10)} book={book} />))
          }
        </div>
        }
      </div>
  )
}

export default AllBooks