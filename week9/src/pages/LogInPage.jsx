import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #212348;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 20px;
  margin: 10px 0;
  border-radius: 50px;
  border: none;
  outline: none;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  align-self: flex-start;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  margin-top: 30px;
  border: none;
  border-radius: 50px;
  width: 100%;
  height: 65px;
  background-color: white;
  color: black;
  font-size: 20px;
  cursor: pointer;

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    height: 55px;
    font-size: 18px;
  }
`;

const Title = styled.div`
  color: white;
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const LogInPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.username) newErrors.username = '아이디를 입력해 주세요';
    if (!data.password) newErrors.password = '비밀번호를 입력해주세요!';
    else if (data.password.length < 4) newErrors.password = '비밀번호는 최소 4자리 이상이어야 합니다!';
    else if (data.password.length > 12) newErrors.password = '비밀번호는 최대 12자리까지 가능합니다!';
    else if (!/[A-Z]/.test(data.password) || !/[a-z]/.test(data.password) || !/[0-9]/.test(data.password) || !/[^A-Za-z0-9]/.test(data.password)) newErrors.password = '비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다!';

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    validateForm(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm(formData);
    if (isValid) {
      try {
        const response = await axios.post('http://localhost:8080/auth/login', formData);
        const { token } = response.data;
        localStorage.setItem('token', token);
        alert('로그인 성공');
        navigate('/');
      } catch (error) {
        console.error('Error logging in:', error);
        alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>로그인 페이지</Title>
        <Input
          type="text"
          name="username"
          placeholder="아이디"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <SubmitButton type="submit" disabled={!isValid}>로그인</SubmitButton>
      </Form>
    </Container>
  );
};

export default LogInPage;
