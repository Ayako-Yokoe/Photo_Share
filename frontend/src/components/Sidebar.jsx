import React from "react"
import { NavLink, Link } from "react-router-dom"
import { RiHomeFill } from "react-icons/ri"
import { IoIosArrowForward } from "react-icons/io"
import { categories } from "../utils/data"
import { IconContext } from "react-icons"

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-white transition-all duration-200 ease-in-out capitalize"
const isActiveStyle =
  "flex items-center px-5 gap-3 font-bold text-fuchsia-600 border-r-2 border-fuchsia-600 transition-all duration-200 ease-in-out capitalize"

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }

  return (
    <div className="flex flex-col justify-between bg-secondary h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center text-fuchsia-600"
          style={{ fontFamily: "Lobster, cursive", fontSize: "28px" }}
          onClick={handleCloseSidebar}
        >
          Photo_Share
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <IconContext.Provider value={{ color: "#E4E6EB" }}>
              <RiHomeFill />
              <span className="text-primary">Home</span>
            </IconContext.Provider>
          </NavLink>

          <h3 className="mt-2 px-5 text-primary 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                alt="category-pic"
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-hover rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p className="text-primary">{user.userName}</p>
          <IconContext.Provider value={{ color: "#E4E6EB" }}>
            <IoIosArrowForward />
          </IconContext.Provider>
        </Link>
      )}
    </div>
  )
}

export default Sidebar
