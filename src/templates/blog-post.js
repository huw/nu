import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';

import { rhythm, scale } from '../utils/typography';

import 'katex/dist/katex.min.css';

const Date = styled(Link)`
  ${scale(-1 / 5)};
  display: block;
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-1)};
  text-decoration: none;
  color: inherit;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: 600;
`;

const Navigation = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin-left: 0;
`;

const BlogPostTemplate = (props) => {
  const {
    data: {
      markdownRemark: post,
      site: {
        siteMetadata: { title: siteTitle },
      },
    },
    pageContext: { previous, next },
    location,
  } = props;

  return (
    <Layout>
      <div>
        <Helmet title={`${post.frontmatter.title} • ${siteTitle}`} />
        <h1>
          {post.frontmatter.title}
        </h1>
        <Date to={location.pathname}>
          <time dateTime={post.frontmatter.date}>
            {post.frontmatter.date}
          </time>
        </Date>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <Navigation>
          {previous && (
            <li>
              <NavigationLink to={previous.fields.slug} rel="prev">
                {'← '}
                {previous.frontmatter.title}
              </NavigationLink>
            </li>
          )}
          {next && (
            <li>
              <NavigationLink to={next.fields.slug} rel="next">
                {next.frontmatter.title}
                {' →'}
              </NavigationLink>
            </li>
          )}
        </Navigation>
      </div>
    </Layout>
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
  pageContext: PropTypes.shape({
    previous: OtherArticle,
    next: OtherArticle,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
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
        date(formatString: "D MMMM, YYYY")
      }
    }
  }
`;
