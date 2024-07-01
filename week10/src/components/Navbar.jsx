import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import MenuIcon from '../assets/Menu.png';
import ShareKakao from "../api/ShareKakao";

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

const Logo = styled.h1`
  color: white;
  font-size: 24px;
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
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <NavbarContainer>
        <Logo><NavLink to="/" style={{ color: 'white' }}>UMC Movie</NavLink></Logo>
        <ShareKakao/>
        <NavItems>
          <NavLink to="/popular" style={({ isActive }) => isActive ? { color: 'yellow' } : null}>Popular</NavLink>
          <NavLink to="/nowplaying" style={({ isActive }) => isActive ? { color: 'yellow' } : null}>Now Playing</NavLink>
          <NavLink to="/toprated" style={({ isActive }) => isActive ? { color: 'yellow' } : null}>Top Rated</NavLink>
          <NavLink to="/upcoming" style={({ isActive }) => isActive ? { color: 'yellow' } : null}>Up Coming</NavLink>
          {!token ? (
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
          {!token ? (
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
