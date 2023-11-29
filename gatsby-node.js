const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query pagesQuery {
      allMdx(filter: { frontmatter: { type: { eq: "page" } } }) {
        nodes {
          body
          frontmatter {
            slug
            description
            type
          }
        }
      }
    }
  `)

  data.allMdx.nodes.forEach(node => {
    const slug = node.frontmatter.slug
    actions.createPage({
      path: slug,
      component: path.resolve("./src/templates/page-template.js"),
      context: {
        slug: slug,
      },
    })
  })
}
