import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css';
import Iconify from '../iconify/Iconify';
import marker from '../../assets/icons/map-location.svg';
// import MarkerClusterGroup from "react-leaflet-markercluster";
const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [40,40],
    color:'blue'
})



const UserMap = ({lat=51.505,long=-0.09}) => {
  return (
    <>
        <MapContainer
            className="markercluster-map h-96"
            center={[lat, long]}
            zoom={13}
            maxZoom={18}
        >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       <>
            <Marker position={[lat,long]} icon={myIcon}>             
              
            <Popup>
             {lat  + long}
            </Popup>
        </Marker>
       </>
       {/* <MarkerClusterGroup>
        <Marker position={[52.2297, 21.0122]} />
        <Marker position={[51.5074, -0.0901]} />
      </MarkerClusterGroup> */}
        </MapContainer>
    </>
  )
}

export default UserMap