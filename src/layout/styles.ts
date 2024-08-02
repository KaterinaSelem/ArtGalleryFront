import styled from '@emotion/styled';

import { NavLink } from 'react-router-dom';

export const LayoutComponent = styled.div`
display: flex;
  flex-direction: column;
  flex: 1;
`
export const Header = styled.header`
 display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 134px;
  padding: 20px;
  color: black;
`
export const HeaderLogoContainer = styled.div`
  width: 100px;
  height: 100px;
`
export const HeaderLogo = styled.img`
  width: 100%;
  height: 100%;
`


export const NavContainer = styled.nav`
  display: flex;
  gap: 10px;
`

export const StyledNavLink = styled(NavLink)`
text-decoration: none;
 font-size: 20px;
 color: white;
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  display: flex;
  flex-direction: column;
  flex: 1;
`
export const Footer = styled.footer`
display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  background: #003780;
  color: white;
`

export const FooterLogoContainer = styled.div`
  width: 50px;
  height: 50px;
`