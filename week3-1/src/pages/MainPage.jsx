import Banner from '../components/Banner';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 40px;
`;

const SearchInput = styled.input`
  width: 400px;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  outline: none;
`;

const SearchButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #1e2125;
  color: yellow;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
`;

function MainPage() {
  return (
    <div>
      <Banner />
      <SearchBarContainer>
        <Title>🎥 Find your Movies!</Title>
        <SearchInput type="text" placeholder="Search movies..." />
        <SearchButton>Search</SearchButton>
      </SearchBarContainer>
    </div>
  );
}

export default MainPage;
