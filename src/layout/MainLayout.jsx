import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

const MainLayout = ({children}) => {
  return (
    <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">

    
    {/* Navbar */}
    
    <Navbar/>


    {/* Page content here */}
    <div className='min-h-screen dark:bg-black dark:text-white'>
    {children}
    </div>
    <Footer/>
  </div> 


  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
    <div className="menu p-4 w-[75%] min-h-full bg-base-200">
      {/* Sidebar content here */}
      <Sidebar/>
    </div>
  </div>
</div>
  )
}

export default MainLayout