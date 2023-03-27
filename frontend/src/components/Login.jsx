import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import smartphone from "../assets/smartphone.jpg"
import { client } from "../client"
import jwt_decode from "jwt-decode"

const Login = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential)
    setUser(userObject)

    localStorage.setItem("user", JSON.stringify(userObject))
    const { name, sub, picture } = userObject
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true })
    })
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    })
  }, [])

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <img src={smartphone} className="w-full h-full object-cover" />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <span className="text-white text-2xl">PHOTO_SHARE</span>
          </div>
          <div id="signInDiv"></div>
        </div>
      </div>
    </div>
  )
}

export default Login
