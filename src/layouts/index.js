import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

// eslint-disable-next-line import/named
import { rhythm, scale } from '../utils/typography';

const Template = (props) => {
  const { children } = props;

  const bioLinkStyle = {
    marginRight: rhythm(0.5),
    textDecoration: 'none',
  };

  const header = (
    <div
      style={{
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between',
        marginBottom: rhythm(1.5),
      }}
    >
      <h1
        style={{
          ...scale(2.5),
          marginTop: 0,
          marginBottom: 0,
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
          huw
        </Link>
      </h1>
      <span>
        <a href="https://github.com/huw" style={bioLinkStyle}>
          git
        </a>
        <a href="mailto:me@huw.nu" style={bioLinkStyle}>
          mail
        </a>
        <Link to="cv.pdf" style={bioLinkStyle}>
          cv
        </Link>
        <a href="https://keybase.io/huw" style={bioLinkStyle}>
          gpg
        </a>
      </span>
    </div>
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
