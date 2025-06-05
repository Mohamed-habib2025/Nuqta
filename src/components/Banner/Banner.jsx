import React from 'react'
import PlayStore from "../../Images/play_store.png"
import AppStore from "../../Images/app_store.png"
import { motion } from "framer-motion"
import "./Appbanner.css"

function Banner() {
  return (
    <div className='w-[85%] mx-auto my-14'>
      <div className=" py-4 px-3 sm:py-0 imgbanner min-h-[200px] md:min-h-[300px] sm:flex sm:justify-center sm:items-center rounded-xl">
        <div>
          <div className=" space-y-3 md:space-y-4 max-w-xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.2,
              }}
              className=" text-3xl sm:text-4xl font-semibold text-center">Download the app
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.3,
              }}
              className=" text-center md:text-xl sm:px-20">Stay constantly connected with those who need you, and help save lives with just one step through our app.
            </motion.p>
            {/* Imges Link */}
            <div className=" flex justify-center items-center gap-4">
              {/* <a href="" className=" cursor-pointer hover:-translate-y-2 duration-200 max-w-[150px] sm:max-w-120px md:max-w-[200px]">
                <motion.img
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: 0.4,
                  }}
                  src={AppStore} alt="" />
              </a> */}

              <a href="" className=" cursor-pointer hover:-translate-y-2 duration-200 max-w-[150px] sm:max-w-120px md:max-w-[200px]">
                <motion.img
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: 0.5,
                  }}
                  src={PlayStore} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
