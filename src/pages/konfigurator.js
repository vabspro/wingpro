import React, { useEffect, useState, useRef } from "react"
import InputRange from "react-input-range"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import gsap from "gsap"
import CloseIcon from "../images/svg/close.inline.svg"

const parsedLevel = ["Anfänger", "Fortgeschrittener", "Profi"]
const parsedWaves = [
  "spiegelglatt",
  "kleine Wellen",
  "mittelgroße Wellen",
  "große Wellen",
]

const isBetween = ({ min, max, value }) => {
  return value > min && value < max
}

const isVaidated = ({ product, size, weight, level, conditions }) => {
  const productDetails = product.wind.find(wind =>
    isBetween({ min: wind.min, max: wind.max, value: conditions })
  )
  const hasLevel = productDetails?.level.includes(parsedLevel[level])
  const isInWeight = isBetween({
    min: productDetails?.weight.min,
    max: productDetails?.weight.max,
    value: weight,
  })

  return productDetails && hasLevel && isInWeight
}

const Product = ({ name, thumb }) => {
  const image = getImage(thumb?.childImageSharp)

  return (
    <div className="konfigurator__product">
      <GatsbyImage image={image} alt="" />
      <h3>{name}</h3>
    </div>
  )
}

export default function KonfiguratorPage({ data }) {
  const [open, setOpen] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)
  const products = data.products?.nodes
  const [size, setSize] = useState(180)
  const [weight, setWeight] = useState(80)
  const [level, setLevel] = useState(1)
  const [conditions, setConditions] = useState({ min: 10, max: 15 })
  const [waves, setWaves] = useState({ min: 1, max: 2 })
  const [styles, setStyles] = useState([])

  const mobileKonfiWrapper = useRef(null)

  const handleStyleClick = style => {
    if (styles.includes(style)) {
      setStyles([...styles.filter(s => s !== style)])
    } else {
      setStyles([...styles, style])
    }
  }

  useEffect(() => {
    if (open) {
      gsap.to(mobileKonfiWrapper.current, {
        css: {
          top: 0,
          borderRadius: 0,
          overflow: "scroll",
        },
        duration: 0.4,
        ease: "Power3.easeInOut",
      })
    } else {
      gsap.to(mobileKonfiWrapper.current, {
        css: {
          top: `calc(100% - 68px)`,
          borderTopLeftRadius: `1rem`,
          borderTopRightRadius: `1rem`,
          overflow: "hidden",
        },
        duration: 0.4,
        ease: "Power3.easeInOut",
      })
    }
  }, [open])

  return (
    <Layout>
      <div className="konfigurator">
        <div className="konfigurator__container">
          <div
            className="konfigurator__header"
            dangerouslySetInnerHTML={{ __html: data.inhalt?.html }}
          />
          <div className="konfigurator__columns">
            <div className="konfigurator__products">
              {products
                .filter(product => {
                  return true
                })
                .map(product => (
                  <Product key={product.id} {...product.frontmatter} />
                ))}
            </div>
            <div className="konfigurator__inputs" ref={mobileKonfiWrapper}>
              <div className="konfigurator__inputs--header">
                <h2 onClick={() => setOpen(true)}>Konfiguriere deine Daten</h2>
                {open ? (
                  <span onClick={() => setOpen(false)}>
                    <CloseIcon />
                  </span>
                ) : null}
              </div>
              <div className="konfigurator__field">
                <strong>Dein Style?</strong>
                <div className="konfigurator__field--input flex">
                  <span
                    onClick={() => handleStyleClick("freeride")}
                    className={styles.includes("freeride") ? "active" : null}
                  >
                    Freeride
                  </span>
                  <span
                    onClick={() => handleStyleClick("freestyle")}
                    className={styles.includes("freestyle") ? "active" : null}
                  >
                    Freestyle
                  </span>
                  <span
                    onClick={() => handleStyleClick("surf")}
                    className={styles.includes("surf") ? "active" : null}
                  >
                    Surf
                  </span>
                </div>
              </div>
              <div className="konfigurator__field">
                <strong>Wie groß bist du?</strong>
                <div className="konfigurator__field--input">
                  <span>
                    {size === 150 ? `<150` : size === 200 ? `>200` : size}cm
                  </span>
                  <label>
                    <InputRange
                      minValue={150}
                      maxValue={200}
                      step={1}
                      value={size}
                      onChange={value => {
                        setHasChanged(true)
                        setSize(value)
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="konfigurator__field">
                <strong>Wie schwer bist du?</strong>
                <div className="konfigurator__field--input">
                  <span>
                    {weight === 50 ? `<50` : weight === 110 ? `>110` : weight}kg
                  </span>
                  <label>
                    <InputRange
                      minValue={50}
                      maxValue={110}
                      step={1}
                      value={weight}
                      onChange={value => {
                        setHasChanged(true)
                        setWeight(value)
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="konfigurator__field">
                <strong>Welches Erfahrungslevel hast du?</strong>
                <div className="konfigurator__field--input">
                  <span>{parsedLevel[level]}</span>
                  <label>
                    <InputRange
                      minValue={0}
                      maxValue={2}
                      step={1}
                      value={level}
                      formatLabel={value => `${parsedLevel[value]}`}
                      onChange={value => {
                        setHasChanged(true)
                        setLevel(value)
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="konfigurator__field">
                <strong>
                  Bei welchen Windbedingungen gehst du aufs Wasser?
                </strong>
                <div className="konfigurator__field--input">
                  <span>
                    {conditions.min}Kn - {conditions.max}Kn
                  </span>
                  <label>
                    <InputRange
                      draggableTrack
                      minValue={0}
                      maxValue={30}
                      step={1}
                      value={conditions}
                      onChange={value => {
                        setHasChanged(true)
                        setConditions(value)
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="konfigurator__field">
                <strong>
                  Bei welchen Wasserbedingungen gehst du aufs Wasser?
                </strong>
                <div className="konfigurator__field--input">
                  <span>
                    {parsedWaves[waves.min]} - {parsedWaves[waves.max]}
                  </span>
                  <label>
                    <InputRange
                      draggableTrack
                      minValue={0}
                      maxValue={3}
                      step={1}
                      value={waves}
                      onChange={value => {
                        setHasChanged(true)
                        setWaves(value)
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    products: allMdx(
      filter: { frontmatter: { type: { eq: "product" } } }
      sort: { fields: frontmatter___order, order: ASC }
    ) {
      nodes {
        frontmatter {
          name
          thumb {
            childImageSharp {
              gatsbyImageData
            }
          }
          level
          riderSize
          riderWeight
          order
          wind
        }
      }
    }
  }
`
