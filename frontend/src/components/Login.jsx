import React, { useState, useEffect } from "react"
import axios from "axios"
// import GoogleLogin from "react-google-login"
import { GoogleOAuthProvider } from "@react-oauth/google"

import { useNavigate } from "react-router-dom"
// import { FcGoogle } from "react-icons/fc"
import { GoogleLogin } from "@react-oauth/google"
import smartphone from "../assets/smartphone.jpg"
import { client } from "../client"

import { googleLogout, useGoogleLogin } from "@react-oauth/google"

const Login = () => {
  const [user, setUser] = useState([])
  // const [profile, setProfile] = useState([])
  const navigate = useNavigate()

  const responseGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  })

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          // setProfile(res.data)
          console.log("data", res.data)
          localStorage.setItem("user", JSON.stringify(res.data))
          const { name, id, picture } = res.data
          console.log("name, id, picture", name, id, picture)
          const doc = {
            _id: id,
            _type: "user",
            userName: name,
            image: picture,
          }
          client.createIfNotExists(doc).then(() => {
            navigate("/", { replace: true })
          })
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  // const responseGoogle = (response) => {

  // localStorage.setItem("user", JSON.stringify(response.profileObj))
  // const { name, googleId, imageUrl } = response.profileObj
  // const doc = {
  //   _id: googleId,
  //   _type: "user",
  //   userName: name,
  //   image: imageUrl,
  // }
  // client.createIfNotExists(doc).then(() => {
  //   navigate("/", { replace: true })
  // })
  // }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <img src={smartphone} className="w-full h-full object-cover" />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <span className="text-white text-2xl">PHOTO_SHARE</span>
          </div>
          <div className="shadow-2xl">
            {/* <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            > */}
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center rounded-lg p-3 outline-none cursor-pointer"
              // onClick={renderProps.onClick}
              // disabled={renderProps.disabled}
              onClick={() => responseGoogle()}
            >
              Sign in with Google
              {/* <GoogleLogin
                  className="mr-4"
                  onSuccess={responseGoogle}
                  onError={() => {
                    console.log("Loging Failed")
                  }}
                /> */}
            </button>
            {/* </GoogleOAuthProvider> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
