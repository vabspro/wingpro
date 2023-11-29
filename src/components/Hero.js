import React from "react"
import { motion, useTransform, useViewportScroll } from "framer-motion"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
function Hero({ title, content, link, files }) {
  const { scrollYProgress } = useViewportScroll()
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -160])
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

  const text = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0 },
    },
    hidden: {
      y: 20,
      opacity: 0,
      transition: { type: "spring", bounce: 0 },
    },
  }

  const image = {
    visible: {
      clipPath: "inset(0 0 0 0)",
      transition: {
        type: "spring",
        bounce: 0,
      },
    },
    hidden: {
      clipPath: "inset(0 100% 0 0)",
    },
  }

  const allImages = useStaticQuery(graphql`
    query allImages {
      list: allImageSharp {
        nodes {
          gatsbyImageData
          fluid {
            originalName
          }
        }
      }
    }
  `)

  const images = allImages.list.nodes
    .filter(img => files.includes(img.fluid.originalName))
    .map(img => getImage(img.gatsbyImageData))
  return (
    <div className="hero">
      <div className="hero__container">
        <motion.h1 initial="hidden" animate="visible" variants={headline}>
          {title ? (
            title.map((line, index) => (
              <span className="hidden" key={index}>
                <motion.span variants={item}>{line}</motion.span>
              </span>
            ))
          ) : (
            <>
              <span className="hidden">
                <motion.span variants={item}>Wingsurfen</motion.span>
              </span>
              <span className="hidden">
                <motion.span variants={item}>lernen auf</motion.span>
              </span>
              <span className="hidden">
                <motion.span variants={item}>Rügen</motion.span>
              </span>
            </>
          )}
        </motion.h1>

        <div className="hero__columns">
          <motion.div
            className="hero__content"
            variants={text}
            initial="hidden"
            animate="visible"
          >
            {content ? (
              <p>{content}</p>
            ) : (
              <p>
                Kraft. Freiheit. Stille. WingFoilen ist berechtigterweise die
                neueste Trendsportart auf dem Wasser. Nur mit einem Wing und dem
                Foilboard mit Foil ausgestattet, schwebst du nahezu lautlos über
                das Wasser. Die Kraft des Windes in deinem Segeltuch, welche
                ohne Umwege durch dich beherrscht wird und die Strömung des
                Wassers, welche dem Foil auftrieb gibt und dich so lautlos über
                das Wasser fliegen lässt. Wenn du genau das erleben willst, dann
                bist du hier beim WingFoilen genau richtig!
              </p>
            )}

            {link && <Link to={link.url}>{link.text}</Link>}
          </motion.div>
          <motion.div
            className="hero__image"
            initial="hidden"
            animate="visible"
            variants={image}
            style={{ y }}
          >
            {images.map((img, index) => (
              <GatsbyImage key={index} alt="hero" image={img} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
