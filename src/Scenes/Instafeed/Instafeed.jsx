import React from "react";
import { buildUrl } from 'react-instafeed'
 
// 🔥️ These are in your code (not this repo)
import useAbortableFetch from '@hooks/useAbortableFetch'
import Image from '@components/Image'


const options = {
    accessToken: 'access...',
    clientId: 'client...',
    get: 'user', // popular, user
    locationId: null,
    resolution: 'standard_resolution', // thumbnail, low_resolution, standard_resolution
    sortBy: 'none', // none, least-commented, least-liked, least-recent, most-commented, most-liked, most-recent, random
    tagName: null,
    userId: 123,
  }

 
export default function Instagram() {
  const { json, loading, error, abort } = useAbortableFetch(buildUrl(options))
  if (loading) return 'Loading...'
  if (error) return `Error: ${error}`
  if (!json) return null
 
  const { data, meta, pagination } = json

  return (
    <>
      {data &&
        data.map(({ caption, id, images, tags }, index) => {
          const image = images[options.resolution]
          return (
              <Image
                key={index}
                url={image.url}
                title={caption.text}
                caption={caption.text}
                width={image.width}
                height={image.height}
              />
          )
        })}
    </>
  )
}