import { Link } from "gatsby"
import React from "react"

function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <span>wingfoil.</span>
        pro
      </Link>
    </div>
  )
}

export default Logo
