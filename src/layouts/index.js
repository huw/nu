import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';

// eslint-disable-next-line import/named
import { rhythm, scale } from '../utils/typography';

const Page = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`;

const Header = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: ${rhythm(1.5)};
`;

const Title = styled.h1`
  ${scale(2.5)};
  margin-top: 0;
  margin-bottom: 0;
`;

const TitleLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`;

const BioHref = styled.a`
  margin-right: ${rhythm(0.5)};
  text-decoration: none;
  color: inherit;

  &:visited,
  &:hover {
    color: inherit;
  }
`;

const BioLink = styled(Link)`
  margin-right: ${rhythm(0.5)};
  text-decoration: none;
  color: inherit;

  &:visited,
  &:hover {
    color: inherit;
  }
`;

const Template = (props) => {
  const { children } = props;

  const header = (
    <Header>
      <Title>
        <TitleLink to="/">
huw
        </TitleLink>
      </Title>
      <span>
        <BioHref href="https://github.com/huw">
git
        </BioHref>
        <BioHref href="mailto:me@huw.nu">
mail
        </BioHref>
        <BioLink to="cv.pdf">
cv
        </BioLink>
        <BioHref href="https://keybase.io/huw">
gpg
        </BioHref>
      </span>
    </Header>
  );

  return (
    <Page>
      {header}
      {children()}
    </Page>
  );
};

Template.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Template;
