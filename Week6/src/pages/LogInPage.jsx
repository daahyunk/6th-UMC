import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #212348;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  padding: 20px;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px;
  margin: 10px 0;
  border-radius: 50px;
  border: none;
  outline: none;
  font-size: 16px;
`;

const SubmitButton = styled.button`
padding: 10px 20px;
margin-top: 30px;
border: none;
border-radius: 50px;
width: 640px;
height: 65px;
background-color: white;
color: black;
font-size: 20px;
cursor: pointer;
&:disabled {
  background-color: white;
  cursor: not-allowed;
}
`;

const Title = styled.div`
  color: white;
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 20px;
`;

const LogInPage = () => {
  return (
    <Container>
      <Form>
        <Title>로그인 페이지</Title>
        <Input type="text" name="username" placeholder="아이디" />
        <Input type="password" name="password" placeholder="비밀번호" />
        <SubmitButton type="submit">로그인</SubmitButton>
      </Form>
    </Container>
  );
};

export default LogInPage;
