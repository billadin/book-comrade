import React from 'react'

const Loading = () => {
  return (
    <div className="relative text-center mt-20">
        <span className="absolute t-0 left-1/2 loading loading-spinner w-14 mt-16"></span>
    </div>
  );
}

export default Loading;