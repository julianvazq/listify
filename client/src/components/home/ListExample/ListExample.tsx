import React from 'react';
import { Container, Image } from './ListExampleStyles';
import ListExampleMobile from '../../../assets/list_example_mobile.png';
import ListExampleDesktop from '../../../assets/list_example_desktop.png';

const ListExample = () => {
  return (
    <Container>
      <picture>
        <source srcSet={ListExampleDesktop} media='(min-width: 800px)' />
        <source srcSet={ListExampleMobile} media='(max-width: 800px)' />
        <Image src={ListExampleMobile} alt='List example.' />
      </picture>
    </Container>
  );
};

export default ListExample;
