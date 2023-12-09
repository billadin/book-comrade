import React, { useContext, useEffect, useState } from 'react'
import BorrowedBookCard from '../components/BorrowedBookCard';
import { nanoid } from 'nanoid';
import BorrowedTable from '../components/BorrowedTable';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../provider/AuthProvider';

const BorrowedBooks = () => {
  const [borrowedItems, setBorrowedItems] = useState([]);
  const {user} = useContext(AuthContext);
  const axios = useAxios()

  


  useEffect(()=> {
   if (user) {
      axios.post(`user/info`, {username: user.email})
      .then(res => {
        setBorrowedItems(res?.data?.borrowedList)
      })
      .catch(e => console.log(e));
    }
  }, [user])

  return (
    <div>

      <div className="w-[80%] mx-auto my-40">
        <div className="flex gap-6 items-center">
          <h1 className="text-4xl font-medium">My Books</h1>
        </div>
        {
        borrowedItems?.length > 0 ? 
        <BorrowedTable borrowedItems={borrowedItems} setBorrowedItems={setBorrowedItems}/> :
        <p className='text-lg font-semibold mt-10'>No books were borrowed</p>
        }
      </div>

    </div>
  )
}

export default BorrowedBooks