import React, { FC } from 'react'
import { Marker, Popup } from 'react-leaflet'

const Pin = ({long, lat, message} : PinProps) => {
  return (
    <Marker position={[lat, long]}>
        <Popup>{message}</Popup>
    </Marker>
  )
}

export default Pin