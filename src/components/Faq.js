import React, { useEffect, useState, useRef } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import gsap from "gsap/gsap-core"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import AnimatedHeadline from "./AnimatedHeadline"

function Faq({ items }) {
  const container = useRef(null)
  const [entries, setEntries] = useState([])
  const [activeItem, setActiveItem] = useState(0)

  const { ref, inView } = useInView({ threshold: 0.3 })
  const data = useStaticQuery(graphql`
    query faqQuery {
      allFaqJson {
        nodes {
          slug
          items {
            antwort
            frage
          }
        }
      }
    }
  `)

  useEffect(() => {
    if (!items) {
      const all = []
      data.allFaqJson.nodes
        .filter(node => ["allgemein", "basiskurs"].includes(node.slug))
        .map(node => node.items)
        .forEach(items => items.forEach(item => all.push(item)))

      setEntries(all)
    } else {
      setEntries(items)
    }
  }, [items])

  const handleClick = ({ event, index }) => {
    const currentActiveItem = container.current.querySelector(
      ".faq__item.active"
    )
    const nextActiveItem = event.target.parentElement

    if (currentActiveItem) {
      gsap.to(currentActiveItem.querySelector(".faq__item--body"), {
        ease: "Power3.easeInOut",
        duration: 0.4,
        height: 0,
      })
    }

    gsap.to(nextActiveItem.querySelector(".faq__item--body"), {
      ease: "Power3.easeInOut",
      duration: 0.4,
      height: nextActiveItem.querySelector(".faq__item--body").scrollHeight,
    })

    setActiveItem(index)
  }

  const initial = {
    y: 10,
    opacity: 0,
  }

  return (
    <div className="faq" ref={ref}>
      <div className="faq__container" ref={container}>
        <AnimatedHeadline lines={["Häufig gestellte", "Fragen"]} />
        <ResponsiveMasonry columnsCountBreakPoints={{ 767: 1, 768: 2 }}>
          <Masonry gutter="2rem">
            {entries &&
              entries.map((item, index) => (
                <motion.div
                  className={
                    activeItem === index + 1 ? "faq__item active" : "faq__item"
                  }
                  key={index + 1}
                  initial={initial}
                  animate={
                    inView && {
                      y: 0,
                      opacity: 1,
                      transition: {
                        delay: index * 0.1,
                        type: "spring",
                        duration: 0.6,
                        bounce: 0,
                      },
                    }
                  }
                >
                  <div
                    className="faq__item--header"
                    onClick={event => handleClick({ event, index: index + 1 })}
                  >
                    {item.frage}
                  </div>
                  <div className="faq__item--body">
                    <ul>
                      {item.antwort &&
                        item.antwort.map((antwort, i) => (
                          <li key={i}>{antwort}</li>
                        ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  )
}

export default Faq
