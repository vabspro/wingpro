import * as React from "react"
import Header from "./Header"
import Footer from "./Footer"
import "../styles/style.sass"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
