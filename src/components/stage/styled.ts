import styled from "styled-components";
import background from "../../assets/background.png";

export const Stage = styled.div`
  height: 500px;
  width: 800px;
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;
