import React, { useState, useRef } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import gsap from "gsap"

function Menu() {
  const nav = useRef(null)
  const [active, setActive] = useState(null)
  const [menu, setMenu] = useState(false)

  const handleClickEvent = () => {
    if (menu) {
      hideMenu()
    } else {
      showMenu()
    }
  }

  const hideMenu = () => {
    const timeline = gsap.timeline()
    timeline.to(nav.current, {
      y: "-100%",
      ease: "Power3.easeInOut",
    })
    setMenu(!menu)
  }

  const showMenu = () => {
    const elem = nav.current
    const firstList = elem.querySelectorAll(".left ul li a")
    const secondList = elem.querySelectorAll(".right ul li a")
    const timeline = gsap.timeline()
    timeline
      .to(elem, {
        y: "0%",
        ease: "Power3.easeInOut",
      })
      .from(Array.from(firstList), {
        stagger: 0.1,
        y: 80,
        duration: 0.6,
        ease: "Power3.easeInOut",
        delay: -0.4,
      })
      .from(Array.from(secondList), {
        stagger: 0.1,
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "Power3.easeInOut",
        delay: -0.75,
      })
    setMenu(!menu)
  }

  return (
    <div className="menu">
      <div className="menu__link">
        <Link to="/kurse">Kurs buchen</Link>
      </div>
      <div className="menu__trigger" onClick={() => handleClickEvent()}>
        <svg fill="none" viewBox="0 0 47 30" xmlns="http://www.w3.org/2000/svg">
          <g
            stroke="#ffa177"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          >
            <path d="m2 6 5.37501-4 5.37499 4 5.375-4 5.375 4 5.375-4 5.375 4 5.375-4 5.375 4" />
            <path d="m2 17 5.37501-4 5.37499 4 5.375-4 5.375 4 5.375-4 5.375 4 5.375-4 5.375 4" />
            <path d="m2 28 5.37501-4 5.37499 4 5.375-4 5.375 4 5.375-4 5.375 4 5.375-4 5.375 4" />
          </g>
        </svg>
      </div>
      <nav className="menu__list" ref={nav}>
        <div className="menu__list--images">
          <div className={active === 0 ? "image active" : "image"}>
            <StaticImage
              src="../images/wingsurfen-00013.jpg"
              alt="wingsurf - basiskurs"
            />
          </div>
          <div className={active === 1 ? "image active" : "image"}>
            <StaticImage
              src="../images/wingsurfen-00005.jpg"
              alt="wingsurf - basiskurs"
            />
          </div>
          <div className={active === 2 ? "image active" : "image"}>
            <StaticImage
              src="../images/wingsurfen-00002.jpg"
              alt="wingsurf - basiskurs"
            />
          </div>
          <div className={active === 3 ? "image active" : "image"}>
            <StaticImage
              src="../images/wingsurfen-00006.jpg"
              alt="wingsurf - basiskurs"
            />
          </div>
        </div>
        <div className="menu__list--container">
          <nav className="menu__list--nav">
            <div className="left">
              <strong>Kursangebot</strong>
              <ul>
                <li
                  onMouseEnter={() => setActive(0)}
                  onMouseLeave={() => setActive(null)}
                >
                  <Link to="/basiskurs">Basiskurs</Link>
                </li>
                <li
                  onMouseEnter={() => setActive(1)}
                  onMouseLeave={() => setActive(null)}
                >
                  <Link to="/einsteigerkurs">Einsteigerkurs</Link>
                </li>
                <li
                  onMouseEnter={() => setActive(2)}
                  onMouseLeave={() => setActive(null)}
                >
                  <Link to="/aufsteigerkurs">Aufsteigerkurs</Link>
                </li>
                <li
                  onMouseEnter={() => setActive(3)}
                  onMouseLeave={() => setActive(null)}
                >
                  <Link to="/umsteigerkurs">Umsteigerkurs</Link>
                </li>
              </ul>
            </div>
            <div className="right">
              <strong>Navigation</strong>
              <ul>
                <li>
                  <Link to="/">Startseite</Link>
                </li>
                <li>
                  <Link to="/karte">Spotkarte</Link>
                </li>
                <li>
                  <Link to="/konfigurator">Materialberatung</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/datenschutz">Datenschutz</Link>
                </li>
                <li>
                  <Link to="/impressum">Impressum</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </nav>
    </div>
  )
}
export default Menu
