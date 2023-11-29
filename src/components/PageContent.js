import React from "react"
import { motion } from "framer-motion"
function PageContent({ title, children }) {
  const headline = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
  const item = {
    visible: { y: 0, transition: { type: "spring", bounce: 0 } },
    hidden: { y: 120, transition: { type: "spring", bounce: 0 } },
  }
  return (
    <div className="pagecontent">
      {title && (
        <motion.h2 initial="hidden" animate="visible" variants={headline}>
          {title.map(line => (
            <span className="hidden">
              <motion.span variants={item}>{line}</motion.span>
            </span>
          ))}
        </motion.h2>
      )}
      <div className="pagecontent__container">
        <p>{children}</p>
      </div>
    </div>
  )
}

export default PageContent
