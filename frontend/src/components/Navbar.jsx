import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { IoMdAdd, IoMdSearch } from "react-icons/io"

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate()

  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full p-7 mb-5">
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-hover border-none outline-none focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search"
            onFocus={() => navigate("/search")}
            className="p-2 w-full bg-hover outline-none text-primary tracking-wider"
          />
        </div>
        <div className="flex gap-3">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img
              src={user?.image}
              alt="user-pic"
              className="w-14 h-12 rounded-lg"
            />
          </Link>
          <Link
            to="/create-pin"
            className="bg-fuchsia-600 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>
    )
  }
  return null
}

export default Navbar
