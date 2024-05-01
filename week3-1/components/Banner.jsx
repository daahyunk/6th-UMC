import styled from 'styled-components';

const BannerContainer = styled.div`
  background-color: #1e2125;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  height: 50%;
  font-size: 20px;
`;

const WelcomeText = styled.h2`
  margin: 0; // 중앙 정렬을 위해 여백을 제거합니다.
`;

function Banner() {
  return (
    <BannerContainer>
      <WelcomeText>환영합니다</WelcomeText>
    </BannerContainer>
  );
}

export default Banner;
