import Layout from '@/components/layout'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const MapPage = () => {
  return (
    <Layout>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>Hello!</Popup>
        </Marker>
      </MapContainer>
    </Layout>
  )
}

export default MapPage