import React, { useEffect, useState, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion"
import { useInView } from "react-intersection-observer"
import AnimatedHeadline from "./AnimatedHeadline"

const items = [
  {
    date: "vor 1 Jahr",
    name: "Rico Kobernik",
    text:
      "Super coole Trainer die sich auf jedenfall die Zeit nehmen und dir das alles step by step bei bringen. Kann ich nur empfehlen.",
  },
  {
    date: "vor 1 Jahr",
    name: "Rico Kobernik",
    text:
      "Super coole Trainer die sich auf jedenfall die Zeit nehmen und dir das alles step by step bei bringen. Kann ich nur empfehlen.",
  },
  {
    date: "vor 1 Jahr",
    name: "Rico Kobernik",
    text:
      "Super coole Trainer die sich auf jedenfall die Zeit nehmen und dir das alles step by step bei bringen. Kann ich nur empfehlen.",
  },
  {
    date: "vor 1 Jahr",
    name: "Rico Kobernik",
    text:
      "Super coole Trainer die sich auf jedenfall die Zeit nehmen und dir das alles step by step bei bringen. Kann ich nur empfehlen.",
  },
]

function Reviews() {
  const container = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [width, setWidth] = useState(0)

  const state = useMotionValue(0)
  const x = useTransform(state, [0, items.length], [0, -(width * items.length)])

  const { scrollYProgress } = useViewportScroll()
  const y = useTransform(scrollYProgress, [0.8, 1], [0, 80])

  const handleClick = ({ index }) => {
    if (index < 0 || index > items.length - 1) {
      console.log("end reached")
      return
    }
    setActiveSlide(index)
    state.set(index)
  }

  useEffect(() => {
    setWidth(container.current.getBoundingClientRect().width)
  }, [])

  return (
    <div className="reviews">
      <div className="reviews__container">
        <AnimatedHeadline lines={["Das sagen glückliche", "Teilnehmer"]} />

        <motion.div className="reviews__shape" style={{ y }}>
          <svg fill="none" viewBox="0 0 330 208">
            <g
              stroke="#f3f8fa"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="20"
            >
              <path d="m10 38.8372 38.7501-28.8372 38.75 28.8372 38.7499-28.8372 38.75 28.8372 38.75-28.8372 38.75 28.8372 38.75-28.8372 38.75 28.8372" />
              <path d="m10 118.14 38.7501-28.8377 38.75 28.8377 38.7499-28.8377 38.75 28.8377 38.75-28.8377 38.75 28.8377 38.75-28.8377 38.75 28.8377" />
              <path d="m10 197.442 38.7501-28.837 38.75 28.837 38.7499-28.837 38.75 28.837 38.75-28.837 38.75 28.837 38.75-28.837 38.75 28.837" />
            </g>
          </svg>
        </motion.div>

        <motion.div className="reviews__container--image">
          <StaticImage alt="reviews" src="../images/reviews.jpg" />
        </motion.div>

        <div className="reviews__slider">
          <div className="reviews__slider--controls">
            <div
              className={activeSlide === 0 ? "prev disabled" : "prev"}
              onClick={() => handleClick({ index: activeSlide - 1 })}
            >
              <svg viewBox="0 0 42 41">
                <path d="m35.0631 14.4211-1.8263 1.8263 2.9611 2.9611h-36.05581v2.5829h36.05581l-2.9611 2.9612 1.8263 1.8263 6.079-6.0789z" />
              </svg>
            </div>
            <div
              className={
                activeSlide >= items.length - 1 ? "next disabled" : "next"
              }
              onClick={() => handleClick({ index: activeSlide + 1 })}
            >
              <svg viewBox="0 0 42 41">
                <path d="m35.0631 14.4211-1.8263 1.8263 2.9611 2.9611h-36.05581v2.5829h36.05581l-2.9611 2.9612 1.8263 1.8263 6.079-6.0789z" />
              </svg>
            </div>
          </div>
          <div className="reviews__slider--inner" ref={container}>
            <motion.div className="reviews__slider--slides" style={{ x }}>
              {items &&
                items.map((item, index) => (
                  <div className="reviews__slider--slide" key={index}>
                    <span>{item.date}</span>
                    <strong>{item.name}</strong>
                    <p>{item.text}</p>
                  </div>
                ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
