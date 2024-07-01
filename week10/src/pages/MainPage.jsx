// pages/MainPage.js

import Banner from '../components/Banner';
import SearchBar from '../components/search/SearchBar';
import styled from 'styled-components';

const BodyContainer = styled.div`
  background-color: #212348;
  width: 100vw;
  height: 100vh;
`;

function MainPage() {
  return (
    <BodyContainer>
      <Banner />
      <SearchBar />
    </BodyContainer>
  );
}

export default MainPage;
