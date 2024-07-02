// components/Footer.js
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2c2f33;
  color: white;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 5px 0;
    font-size: 12px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      © 2024 UMC Movies. All rights reserved.
    </FooterContainer>
  );
}

export default Footer;
