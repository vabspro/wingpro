import React, { useEffect, useState } from "react"
import MapWrapper from "../components/map/MapWrapper"
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  LayerGroup,
} from "react-leaflet"
import { graphql } from "gatsby"
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Particles from "../components/map/Particles"
import WindIcon from "../images/svg/wind.inline.svg"
import DirectionIcon from "../images/svg/direction.inline.svg"
import Layout from "../components/layout"

import "swiper/swiper.scss"
import Seo from "../components/seo"

SwiperCore.use([Navigation])

const SliderItem = ({ name, wind, description }) => {
  return (
    <div className="map__slider--item">
      <div className="map__slider--item-header">
        <strong>{name}</strong>
        <div className="icons">
          <DirectionIcon /> {wind?.direction}
        </div>
      </div>
      <div className="map__slider--item-body">
        <p>{description}</p>
      </div>
    </div>
  )
}

const MapEvents = ({ coords }) => {
  const map = useMap()

  useEffect(() => {
    if (coords) {
      map.flyTo(coords)
    }
  }, [coords])
  return null
}

const SpotMapPage = ({ data }) => {
  const zoom =
    typeof window !== "undefined" && window.innerWidth <= 600 ? 12 : 13
  const center =
    typeof window !== "undefined" && window.innerWidth <= 600
      ? [54.302476, 13.696]
      : [54.3026, 13.690486]
  const [activeSpot, setActiveSpot] = useState(null)
  const [showParticles, setShowParticles] = useState(false)

  const spots = data.spots?.nodes

  const [swiper, setSwiper] = useState(null)
  const swiperOptions = {
    spaceBetween: 0,
    slidesPerView: 1,
  }

  const handleMarkerClickEvent = ({ spot, index }) => {
    setActiveSpot(spot)
    swiper.slideTo(index)
  }

  const handleSlideChangeEvent = swiper => {
    const spot = spots[swiper.activeIndex]
    setActiveSpot(spot)
  }

  if (typeof window !== "undefined") {
    return (
      <Layout>
        <Seo title="Wingfoil Spotkarte" description="" />
        <MapWrapper>
          <div
            className="map__particles--button"
            style={{ opacity: showParticles ? 1 : 0.4 }}
            role="button"
            tabindex="-2"
            onClick={() => setShowParticles(!showParticles)}
          >
            <WindIcon />
          </div>
          {showParticles ? (
            <Particles rotation={activeSpot ? activeSpot.wind.rotation : 0} />
          ) : null}
          <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
            <MapEvents coords={activeSpot?.coords} />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {activeSpot ? (
              <LayerGroup>
                <Marker position={activeSpot.coords} />
              </LayerGroup>
            ) : (
              <LayerGroup>
                {spots.map((spot, index) => (
                  <Marker
                    key={spot.id}
                    position={spot.coords}
                    eventHandlers={{
                      click: () => handleMarkerClickEvent({ spot, index }),
                    }}
                  />
                ))}
              </LayerGroup>
            )}
          </MapContainer>
          <div className="map__slider">
            <Swiper
              {...swiperOptions}
              onSlideChange={handleSlideChangeEvent}
              navigation
              onSwiper={setSwiper}
            >
              {spots.map(spot => (
                <SwiperSlide key={spot.id} coords={spot.coords}>
                  <SliderItem {...spot} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </MapWrapper>
      </Layout>
    )
  }
  return null
}

export const query = graphql`
  query SpotQuery {
    spots: allSpotsJson(sort: { fields: name, order: ASC }) {
      nodes {
        coords
        description
        id
        name
        spot
        wind {
          direction
          rotation
          size
        }
      }
    }
  }
`

export default SpotMapPage
