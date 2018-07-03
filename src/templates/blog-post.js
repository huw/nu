import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

// eslint-disable-next-line import/named
import { rhythm, scale } from '../utils/typography';

const BlogPostTemplate = (props) => {
  const {
    data: {
      markdownRemark: post,
      site: {
        siteMetadata: { title: siteTitle },
      },
    },
    pathContext: { previous, next },
  } = props;

  return (
    <div>
      <Helmet title={`${post.frontmatter.title} • ${siteTitle}`} />
      <h1>
        {post.frontmatter.title}
      </h1>
      <time
        dateTime={post.frontmatter.date}
        style={{
          ...scale(-1 / 5),
          display: 'block',
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {post.frontmatter.date}
      </time>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
          marginLeft: 0,
        }}
      >
        {previous && (
          <li>
            <Link to={previous.fields.slug} rel="prev">
              {'← '}
              {previous.frontmatter.title}
            </Link>
          </li>
        )}
        {next && (
          <li>
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title}
              {' →'}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

const OtherArticle = PropTypes.shape({
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
});

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired,
      html: PropTypes.node.isRequired,
    }).isRequired,
  }).isRequired,
  pathContext: PropTypes.shape({
    previous: OtherArticle,
    next: OtherArticle,
  }).isRequired,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
