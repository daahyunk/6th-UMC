import styled from 'styled-components';
import KakaoBtnImage from '../assets/kakaoBtn.png';
import getRedirectURI from '../components/RedirectURI';

const KakaoButton = styled.img`
  cursor: pointer;
  width: 100%;
  max-width: 340px;
  margin-top: 50px;

  @media (max-width: 768px) {
    max-width: 300px; 
  }

  @media (max-width: 480px) {
    margin-top: 30px;
    max-width: 270px;
  }
`;

const LoginKakao = () => {
    const kakaoRestAPI = import.meta.env.VITE_REST_API; 
    const redirectURI = getRedirectURI(); 
  
    const handleLogin = () => {
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestAPI}&redirect_uri=${redirectURI}&response_type=code`;
      window.location.href = kakaoURL;
    };
  
    return <KakaoButton src={KakaoBtnImage} alt="Kakao Login" onClick={handleLogin} />;
  };

export default LoginKakao;
