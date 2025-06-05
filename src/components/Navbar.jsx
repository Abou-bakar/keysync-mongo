import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-4 h-12">

      
        <div className="logo font-bold text-2xl">
          
          <span>Key</span><span className='text-green-900'>Sync</span>

        </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href='/'>Home</a>
                <a className='hover:font-bold' href='#'>About</a>
                <a className='hover:font-bold' href='#'>Contact</a>
            </li>
        </ul> */}
        <button className='text-white bg- bg-black my-4 rounded-full flex justify-between items-center'>
          <img className='invert p-1 w-10' src="icons/github.png" alt="li" />
          <span className='font-bold px-1'>Github</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
