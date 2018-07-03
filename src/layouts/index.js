import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

// eslint-disable-next-line import/named
import { rhythm, scale } from '../utils/typography';

const Template = (props) => {
  const { children } = props;

  const header = (
    <h1
      style={{
        ...scale(1.5),
        marginBottom: rhythm(1.5),
        marginTop: 0,
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'inherit',
        }}
        to="/"
      >
        Huw
      </Link>
    </h1>
  );

  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      {header}
      {children()}
    </div>
  );
};

Template.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Template;
