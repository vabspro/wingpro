import React from "react"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p>
          © {new Date().getFullYear()} | Konzept, Gestaltung und Entwicklung mit
          💙 von{" "}
          <a href="www.uwe-horn.net" title="Uwe Horn - Webdesigner">
            {" "}
            www.uwe-horn.net
          </a>
        </p>
        <p></p>
      </div>
    </footer>
  )
}

export default Footer
