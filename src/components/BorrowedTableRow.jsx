import React, { useContext, useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios'
import { AuthContext } from '../provider/AuthProvider'
import { enqueueSnackbar } from 'notistack'

const BorrowedTableRow = ({book, setBorrowedItems}) => {

  const {user} = useContext(AuthContext)
  const axios = useAxios()
  const username = user.email;
  const [isReturned, setIsReturned] = useState(false)

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


  const handleReturn = async () => {

    console.log('clicked')
    console.log(book)
    console.log('clicked')
    axios.patch(`book/${book?.isbn}/quantity/update`, {category: book?.category, borrowed: false, username})
    .then(res => {
      if(res.data?.modifiedCount===1) {
        success('Book returned successfully')
      }
      setIsReturned(true)
    })
    .catch(e => {
      fail(`Failed: ${e.message}`)
      console.log(e)
    })

    axios.patch(`user/info`, { username, isbn: book?.isbn})
    .then(res => {
      if(res?.data?.modifiedCount === 1) {
        success('Book returned successfully')
      }
    })
    .catch(e =>{
      fail(`Failed: ${e.message}`)
       console.log(e)});
  }


  useEffect(()=> {
if(isReturned) {
  axios.post(`user/info`, {username: user.email})
      .then(res => {
        setBorrowedItems(res?.data?.borrowedList)
        setIsReturned(false);
      })
      .catch(e => console.log(e));
}
  }, [isReturned])

  return (
    <>
      <tr className='flex flex-col md:flex-row items-center'>

        <td className=''>
          <div className="flex flex-col items-start space-x-3 space-y-3">
            <div className="avatar mx-auto">
              <div className="mask w-40 h-40 mx-auto">
                <img
                  src={book?.image}
                  className='rounded-sm mx-auto'
                />
              </div>
            </div>
            <div>
              <p className="font-bold">{book?.name}</p>
              <p className="text-sm">{book?.category}</p>
            </div>
          </div>
        </td>

        <td className='mx-auto'>
          <p className='mb-2'>
          Borrowed at: 
          <span className="badge badge-ghost badge-sm ml-2">
            {book?.borrowedAt}
          </span>
          </p>
          <p>
          Expired In: 
          <span className="badge badge-ghost badge-sm ml-2">
            {book?.returnBy}
          </span>
          </p>
        </td>

        <td className='flex md:flex-col gap-4'>
            {/* <button  className='btn btn-sm btn-secondary'>Read</button> */}
            <button onClick={handleReturn} className='btn btn-sm btn-accent'>Return</button>
        </td>

      </tr>
    </>
  );
}

export default BorrowedTableRow