import React from "react"
import Accordion from "../components/Accordion"
import CourseList from "../components/CourseList"

import Layout from "../components/Layout"
import Seo from "../components/seo"

import { graphql } from "gatsby"

import Reviews from "../components/Reviews"
import Faq from "../components/Faq"
import Hero from "../components/Hero"

const IndexPage = ({ data }) => {
  const faqItems = data.faqItems.nodes[0].items

  return (
    <Layout>
      <Seo title="wingfoil.pro" />
      <Hero files={["wingsurfen-00001.jpg"]} />
      <Accordion />
      <CourseList />
      <Reviews />
      <Faq items={faqItems} />
    </Layout>
  )
}

export const query = graphql`
  query startseitenQuery {
    faqItems: allFaqJson(filter: { slug: { eq: "allgemein" } }) {
      nodes {
        items {
          antwort
          frage
        }
      }
    }
  }
`

export default IndexPage
