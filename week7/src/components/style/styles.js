import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #212348;
  padding-bottom: 10vh;
`;

export const MoviesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const MovieCard = styled.div`
  width: 300px;
  height: 550px;
  margin: 15px;
  background-color: #373B66;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
  padding-bottom: 15px;
`;

export const Image = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-top-right-radius: 5px;
  border-top-left-radius: 10px;
`;

export const Info = styled.div`
  padding: 10px;
  color: #fff;
`;

export const Title = styled.h3`
  padding-left: 5px;
  padding-right: 5px;
  font-size: 16px;
  margin: 0;
  margin-bottom: 5px;
`;

export const Rating = styled.span`
  padding-left: 5px;
  color: white;
  border-radius: 5px;
  font-weight: bold;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: transparent;
  color: ${(props) => (props.disabled ? '#888' : '#ffeb3b')};
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export const PageNumber = styled.span`
  font-size: 20px;
  color: white;
`;
