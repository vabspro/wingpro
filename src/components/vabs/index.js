import React from "react"
import { Provider } from "react-redux"
import initialState from "./redux/initialState"
import ContactModule from "./modules/contact/index"
import BookingModule from "./modules/booking/index"
import { useLocation } from "@reach/router"

import * as vabs from "../../styles/vabs/vabs.sass"

function Vabs({ type, id }) {
  const location = useLocation()
  const url = location.origin + "/api/dist/index.php"
  //const url = "http://wing.uwe-horn.net/api/dist/index.php"
  let render = (
    <ContactModule url={url} datenschutz="/datenschutz" redirect="/danke" />
  )
  if (type === "booking") {
    render = (
      <BookingModule
        url={url}
        type="group"
        query="41"
        datenschutz="/datenschutz"
        redirect="/danke"
        id={id}
      />
    )
  }
  return <Provider store={initialState}>{render}</Provider>
}

export default Vabs
