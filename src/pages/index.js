import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from 'styled-components';

// eslint-disable-next-line import/named
import { scale, rhythm } from '../utils/typography';

const PostTitle = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`;

const PostTitleLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;

  &:hover,
  &:visited {
    color: inherit;
  }
`;

const PostDate = styled.time`
  display: block;
  ${scale(-1 / 4)};
  margin-top: ${rhythm(-1 / 4)};
  margin-bottom: ${rhythm(1 / 4)};
`;

const BlogIndex = (props) => {
  const {
    data: {
      site: {
        siteMetadata: { title: siteTitle },
      },
      allMarkdownRemark: { edges: posts },
    },
  } = props;

  return (
    <div>
      <Helmet title={siteTitle} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <div key={node.fields.slug}>
            <PostTitle>
              <PostTitleLink to={node.fields.slug}>
                {title}
              </PostTitleLink>
            </PostTitle>
            <PostDate dateTime={node.frontmatter.date}>
              {node.frontmatter.date}
            </PostDate>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        );
      })}
    </div>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf([
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }).isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
            excerpt: PropTypes.node.isRequired,
          }).isRequired,
        }).isRequired,
      ]).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`;
