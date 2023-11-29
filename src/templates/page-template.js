import React from "react"
import Faq from "../components/Faq"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Seo from "../components/seo"

const KursTemplate = ({ data }) => {
  const mdx = data.mdx.body
  const { title, description } = data.mdx.frontmatter
  const faqItems = data.faqItems.nodes[0]?.items
  console.log({ title, description })
  return (
    <Layout>
      <Seo title={title} description={description} />
      <div className="page">
        <MDXRenderer>{mdx}</MDXRenderer>
      </div>
      {faqItems && <Faq items={faqItems} />}
    </Layout>
  )
}

export const query = graphql`
  query kursQuery($slug: String) {
    faqItems: allFaqJson(filter: { slug: { eq: $slug } }) {
      nodes {
        items {
          antwort
          frage
        }
      }
    }
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        slug
        description
        title
      }
    }
  }
`

export default KursTemplate
