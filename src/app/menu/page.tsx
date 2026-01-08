import React from 'react'
import MenuNav from '@/_component/menuNav/page';

 const page = () => {
  return (
    <div>
      <div className="pt-16">
        <div
          className=" w-full min-h-screen bg-center bg-cover relative"
          style={{ backgroundImage: `url(/menu.jpg)` }}
        ></div>
        <MenuNav/>
      </div>
    </div>
  )
}
export default page