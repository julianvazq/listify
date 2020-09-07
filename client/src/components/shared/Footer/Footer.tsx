import React from 'react';
import { Container, FooterText } from './FooterStyles';

const Footer = () => {
  return (
    <Container>
      <FooterText>@Listify {new Date().getFullYear()}</FooterText>
    </Container>
  );
};

export default Footer;
