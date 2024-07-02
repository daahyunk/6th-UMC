import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import MenuIcon from '../assets/Menu.png';
import ShareKakao from "../api/ShareKakao";
import getRedirectURI from '../components/RedirectURI'; // Redirect URI 가져오기
import useUser from '../components/hooks/useUser'; // useUser 훅을 가져옵니다

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2c2f33;
  padding: 10px 20px;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  color: white;
  font-size: 24px;
  margin-right: 10px; /* 로고와 ShareKakao 사이의 간격 */

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const NavItems = styled.div`
  a {
    color: white;
    text-decoration: none;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      color: yellow;
      font-size: 17px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  outline: none;

  img {
    width: 25px;
    height: 25px;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 60px; /* 네비바 높이에 따라 조정 */
  right: 0;
  height: calc(100% - 60px); /* 네비바 높이를 뺀 나머지 영역 */
  width: 95%;
  background-color: #2c2f33;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const SidebarNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 15px;
  font-size: 18px;
  font-weight: medium;

  &:hover {
    color: yellow;
  }
`;

const Navbar = () => {
  const { user, loading } = useUser();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    const kakaoRestAPI = import.meta.env.VITE_REST_API;
    const logoutRedirectURI = getRedirectURI();
    const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${kakaoRestAPI}&logout_redirect_uri=${logoutRedirectURI}`;

    localStorage.removeItem('token');
    localStorage.removeItem('kakao_token');
    localStorage.removeItem('nickname');
    window.location.href = kakaoLogoutURL; // 로그아웃 URL로 리디렉션
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <NavbarContainer>
        <LogoWrapper>
          <Logo><NavLink to="/" style={{ color: 'white' }}>UMC Movie</NavLink></Logo>
          <ShareKakao />
        </LogoWrapper>
        <NavItems>
          <NavLink to="/popular" style={({ isActive }) => isActive ? { color: 'yellow' } : null}>Popular</NavLink>
          <NavLink to="/nowplaying" style={({ isActive }) => isActive ? { color: 'yellow' } : null}>Now Playing</NavLink>
          <NavLink to="/toprated" style={({ isActive }) => isActive ? { color: 'yellow' } : null}>Top Rated</NavLink>
          <NavLink to="/upcoming" style={({ isActive }) => isActive ? { color: 'yellow' } : null}>Up Coming</NavLink>
          {!loading && !user ? (
            <>
              <NavLink to="/signup" style={({ isActive }) => isActive ? { color: 'yellow' } : null}>회원가입</NavLink>
              <NavLink to="/login" style={({ isActive }) => isActive ? { color: 'yellow' } : null}>로그인</NavLink>
            </>
          ) : (
            <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>로그아웃</button>
          )}
        </NavItems>
        {isTabletOrMobile && (
          <MenuButton onClick={toggleSidebar}>
            <img src={MenuIcon} alt="Menu" />
          </MenuButton>
        )}
      </NavbarContainer>
      {isTabletOrMobile && (
        <SidebarContainer isOpen={sidebarOpen}>
          <SidebarNavLink to="/popular" onClick={() => setSidebarOpen(false)}>Popular</SidebarNavLink>
          <SidebarNavLink to="/nowplaying" onClick={() => setSidebarOpen(false)}>Now Playing</SidebarNavLink>
          <SidebarNavLink to="/toprated" onClick={() => setSidebarOpen(false)}>Top Rated</SidebarNavLink>
          <SidebarNavLink to="/upcoming" onClick={() => setSidebarOpen(false)}>Up Coming</SidebarNavLink>
          {!loading && !user ? (
            <>
              <SidebarNavLink to="/signup" onClick={() => setSidebarOpen(false)}>회원가입</SidebarNavLink>
              <SidebarNavLink to="/login" onClick={() => setSidebarOpen(false)}>로그인</SidebarNavLink>
            </>
          ) : (
            <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>로그아웃</button>
          )}
        </SidebarContainer>
      )}
    </>
  );
};

export default Navbar;
