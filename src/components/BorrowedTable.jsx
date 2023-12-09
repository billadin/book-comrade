import React from 'react'
import BorrowedTableRow from './BorrowedTableRow'
import { nanoid } from 'nanoid'

const BorrowedTable = ({borrowedItems, setBorrowedItems}) => {

  return (
    <div className="overflow-x-auto my-16">
  <table className="table">    
    <tbody>
      {
        borrowedItems?.map((book) => <BorrowedTableRow book={book} key={nanoid(10)} setBorrowedItems={setBorrowedItems} />)
      }
    </tbody>
  </table>
</div>
  )
}

export default BorrowedTable