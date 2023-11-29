import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

function AnimatedHeadline({ lines }) {
  const { ref, inView } = useInView({ threshold: 0.7 })

  const show = {
    y: 0,
  }

  const hide = {
    y: 120,
  }

  return (
    <h2 ref={ref} className="animated-headline">
      {lines.map((line, index) => (
        <span className="hidden" key={index}>
          <motion.span
            animate={inView ? show : hide}
            transition={{ type: "spring", bounce: 0, delay: index * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}

export default AnimatedHeadline
