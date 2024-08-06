import React from 'react';
import { FooterContainer, FooterItem, FooterSection, FooterTitle } from './styles';


const FooterComponent: React.FC = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterTitle>ABOUT US</FooterTitle>
        <FooterItem>About</FooterItem>
        <FooterItem>Our rules</FooterItem>
        <FooterItem>Conditions</FooterItem>
        <FooterItem>Help</FooterItem>
      </FooterSection>
      <FooterSection>
        <FooterTitle>CONTACT US</FooterTitle>
        <FooterItem>+149 0101010</FooterItem>
        <FooterItem>everyday_info@gmail.com</FooterItem>
      </FooterSection>
      <FooterSection>
        <FooterTitle>SOCIAL</FooterTitle>
        <FooterItem>Facebook</FooterItem>
        <FooterItem>Instagram</FooterItem>
      </FooterSection>
    </FooterContainer>
  );
}

export default FooterComponent;