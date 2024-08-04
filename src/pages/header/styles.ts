import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 134px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const HeaderContainer = styled.header`
  height: 94px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 10px 20px; */
  color: white;
  width: 80%;
  margin-left: 150px;
  align-items: center;
`;

export const HeaderWrapWht = styled.header`
  height: 94px;
  border-bottom: 2px solid black;
  width: 100%;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 40px;
  justify-content: space-evenly;
`;

export const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  color: #000;
  font-family: Barlow;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const WrapIcons = styled.div`
  display: flex;
  width: 110px;
  gap: 44px;
`;

export const ArtLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  color: #fff;
  text-align: center;
  font-family: Barlow;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

export const HeaderWrapBlck = styled.header`
  width: 100%;
  background-color: black;
`;

export const WrapUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: black;
  width: 80%;
  align-self: center;
  margin-left: 150px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 80%;
  justify-content: center;
  padding-left: 130px;
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const ButtonDiv = styled.div`
  display: inline-flex;
  padding: 10px 27px 10px 27px;
  justify-content: center;
  align-items: center;
  background: #514f4f;
`;
