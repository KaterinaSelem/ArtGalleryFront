import React from 'react';
import {
  Footer,
  FooterLogoContainer,
  Header,
  HeaderLogo,
  HeaderLogoContainer,
  LayoutComponent,
  Main,
  NavContainer,
  StyledNavLink,
} from './styles';
import { LayoutProps } from './types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutComponent>
      <Header>
        <HeaderLogoContainer>
          <HeaderLogo />
        </HeaderLogoContainer>
        <NavContainer>
          <StyledNavLink to="/" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>
            ARTISTS
          </StyledNavLink>
          <StyledNavLink to="/about" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>
            GALLERIE
          </StyledNavLink>
        </NavContainer>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <FooterLogoContainer>
          <HeaderLogo />
        </FooterLogoContainer>
      </Footer>
    </LayoutComponent>
  );
};

export default Layout;