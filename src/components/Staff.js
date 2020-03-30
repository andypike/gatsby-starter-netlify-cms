import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class Staff extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: staff } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {staff &&
          staff.map(({ node: person }) => (
            <div className="is-parent column is-6" key={person.id}>
              <article className="blog-list-item tile is-child box notification">
                <header>
                  {person.frontmatter.photo ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: person.frontmatter.photo,
                          alt: `Photo of ${post.frontmatter.first_name} ${post.frontmatter.last_name}`
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={person.fields.slug}
                    >
                      {person.frontmatter.first_name}{" "}
                      {person.frontmatter.last_name}
                    </Link>
                  </p>
                </header>
              </article>
            </div>
          ))}
      </div>
    );
  }
}

Staff.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query StaffQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "staff" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                first_name
                last_name
                templateKey
                date(formatString: "MMMM DD, YYYY")
                photo {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Staff data={data} count={count} />}
  />
);
