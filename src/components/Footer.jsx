import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bottom-0 fixed'>
      <footer class="bg-white text-black py-2 px-2 mt-3">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-3">
            <p class="text-xs text-black md:text-sm">Copyright 2025 &copy; All Rights Reserved</p>
        </div>
        <div class="w-full md:w-1/2 md:text-center md:mb-0 mb-3">
            <ul class="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
                <li><a href="#" class="text-black hover:font-bold">Contact</a></li>
                <li class="mx-4"><a href="#" class="text-black hover:font-bold">Privacy Policy</a></li>
                <li><a href="#" class="text-black hover:font-bold">Terms of Use</a></li>
            </ul>
        </div>
    </div>
</footer>
    </div>
  )
}

export default Footer
