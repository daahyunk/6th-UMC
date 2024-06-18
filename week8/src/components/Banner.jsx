import styled from 'styled-components';
import useUser from '../components/hooks/useUser';

const BannerContainer = styled.div`
  background-color: #1e2125;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  height: 20%;
  font-size: 20px;
`;

const WelcomeText = styled.h2`
  margin: 0;
`;

const Banner = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <BannerContainer>로딩 중...</BannerContainer>;
  }

  return (
    <BannerContainer>
      <WelcomeText>{user ? `${user.name}님 환영합니다.` : '환영합니다'}</WelcomeText>
    </BannerContainer>
  );
};

export default Banner;
