import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #212348;
  padding: 20px;

  @media (max-width: 768px) {
    padding-left: 50px;
    padding-right: 50px;
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
  background-color: yellow;
  color: black;
  font-size: 20px;
  cursor: pointer;

  &:disabled {
    background-color: white;
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

const LoginLink = styled.div`
  margin-top: 20px;
  color: white;
  a {
    color: white;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      if (!formData.name) newErrors.name = '이름을 입력해주세요!';
      if (!formData.username) newErrors.username = '아이디를 입력해주세요!';
      if (!formData.email) newErrors.email = '이메일을 입력해주세요!';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '이메일 양식에 맞지 않습니다!';
      if (!formData.age) newErrors.age = '나이를 입력해주세요!';
      else if (isNaN(formData.age)) newErrors.age = '나이는 숫자로 입력해주세요!';
      else if (formData.age < 0) newErrors.age = '나이는 음수가 될 수 없습니다!';
      else if (formData.age % 1 !== 0) newErrors.age = '나이는 소수가 될 수 없습니다!';
      else if (formData.age < 19) newErrors.age = '19살 이상만 가입이 가능합니다!';
      if (!formData.password) newErrors.password = '비밀번호를 입력해주세요!';
      else if (formData.password.length < 4) newErrors.password = '비밀번호는 최소 4자리 이상이어야 합니다!';
      else if (formData.password.length > 12) newErrors.password = '비밀번호는 최대 12자리까지 가능합니다!';
      else if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[^A-Za-z0-9]/.test(formData.password)) newErrors.password = '비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다!';
      if (!formData.confirmPassword) newErrors.confirmPassword = '비밀번호 확인을 입력해주세요!';
      else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다!';

      setErrors(newErrors);
      setIsValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      try {
        const payload = {
          ...formData,
          passwordCheck: formData.confirmPassword
        };
        await axios.post('http://localhost:8080/auth/signup', payload);
        alert('회원가입이 정상적으로 처리되었습니다.');
        navigate('/login');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert('이미 존재하는 아이디입니다.');
        } else if (error.response && error.response.status === 400) {
          alert('비밀번호가 일치하지 않습니다.');
        } else {
          console.error('Error submitting form:', error);
        }
      }
    }
  };

  return (
    <Container>
      <Title>회원가입 페이지</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="이름을 입력해주세요"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        <Input
          type="text"
          name="username"
          placeholder="아이디를 입력해주세요"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
        <Input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <Input
          type="text"
          name="age"
          placeholder="나이를 입력해주세요"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        <SubmitButton type="submit" disabled={!isValid}>제출하기</SubmitButton>
      </Form>
      <LoginLink>
        이미 아이디가 있으신가요? <a href="/login">로그인 페이지로 이동하기</a>
      </LoginLink>
    </Container>
  );
};

export default SignUpPage;
