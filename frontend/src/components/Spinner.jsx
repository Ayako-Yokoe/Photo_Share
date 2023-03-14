import React from "react"
import { ThreeDots } from "react-loader-spinner"

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#f600f2"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        className="m-5"
      />
      <p className="text-lg tect-center px-2 text-primary">{message}</p>
    </div>
  )
}

export default Spinner
