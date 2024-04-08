import styled from 'styled-components';

export const Overview = styled.div`
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); 
  opacity: 0.8; 
  color: white;
  padding:5px;
  font-size:15px;
  padding-left: 10px;
`;

export const MovieContainer = styled.div`
  position: relative;
  width: 250px;
  margin: 16px;
  background-color: #373b69;
  color: white;
  border-radius: 5px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);

  &:hover ${Overview} {
    display: block;
  }

  img {
    max-width: 100%;
  }
`;

export const MovieInfo = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin: 0;
  }

  span {
    margin-left: 3px;
  }
`;