import React, { useState, useEffect } from "react"
import { AiOutlineLogout } from "react-icons/ai"
import { useParams, useNavigate } from "react-router-dom"

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data"
import { client } from "../client"
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none"
const notActiveBtnStyles =
  "bg-primary text-white mr-4 font-bold p-2 rounded-full w-20 outline-none"

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState("Created")
  const [activeBtn, setActiveBtn] = useState("created")
  const navigate = useNavigate()
  const { userId } = useParams()

  const User =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear()

  useEffect(() => {
    const query = userQuery(userId)

    client.fetch(query).then((data) => {
      setUser(data[0])
    })
  }, [userId])

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId)

      client.fetch(createdPinsQuery).then((data) => setPins(data))
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId)

      client.fetch(savedPinsQuery).then((data) => setPins(data))
    }
  }, [text, userId])

  const logout = () => {
    localStorage.clear()
    setUser(null)

    navigate("/login")
  }

  if (!user) {
    return <Spinner message="Loading profile..." />
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center text-primary mt-3">
            {user.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2 m-5">
            {userId === User.sub && (
              <button
                className="text-white"
                type="button"
                onClick={() => logout()}
              >
                <div className="flex justify-center items-center ">
                  <div className="tracking-wider text-white mr-2">Log Out</div>
                  <AiOutlineLogout fontSize={30} />
                </div>
              </button>
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent)
              setActiveBtn("created")
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent)
              setActiveBtn("saved")
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl text-primary mt-2">
            No Pins Found
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
