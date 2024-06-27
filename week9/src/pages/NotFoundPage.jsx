import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  background-color: #212348;
`;

const ErrorMessage = styled.h1`
  font-size: 24px;
`;

const BackButton = styled(Link)`
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
`;

function NotFoundPage() {
  return (
    <NotFoundContainer>
      <ErrorMessage>페이지를 찾을 수 없습니다.</ErrorMessage>
      <BackButton to="/">메인으로 이동하기</BackButton>
    </NotFoundContainer>
  );
}

export default NotFoundPage;
