
import { Footer, Header, LayoutComponent, Main } from './styles';

import FooterComponent from '../pages/footer/FooterComponent';
import { LayoutProps } from './types';
import HeaderComponent from '../pages/header/HeaderComponent';


function Layout({children}: LayoutProps) {
  return <LayoutComponent>
  <Header>
  <HeaderComponent users={[]}/>
 
  </Header>
  <Main>{children}</Main>
  <Footer>
    <FooterComponent />
  </Footer>
</LayoutComponent>
}

export default Layout;