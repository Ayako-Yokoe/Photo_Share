import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { client } from "../client"
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"
import { feedQuery, searchQuery } from "../utils/data"

const Feed = () => {
  const [pins, setPins] = useState()
  const [loading, setLoading] = useState(false)
  const { categoryId } = useParams()

  useEffect(() => {
    if (categoryId) {
      setLoading(true)
      const query = searchQuery(categoryId)
      client.fetch(query).then((data) => {
        setPins(data)
        setLoading(false)
      })
    } else {
      setLoading(true)
      client.fetch(feedQuery).then((data) => {
        setPins(data)
        setLoading(false)
      })
    }
  }, [categoryId])

  if (loading) return <Spinner message="We are adding new pin to your feed" />

  if (!pins?.length) return <p className="text-primary">No Pins Available</p>

  return <div>{pins && <MasonryLayout pins={pins} />}</div>
}

export default Feed
