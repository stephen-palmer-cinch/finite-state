import styled from "styled-components";

export const AvailablePokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AvailablePokemonRow = styled.button`
  line-height: 50px;
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-evenly;
  font-family: "Press Start 2P";
  cursor: pointer;
`;

export const AvailablePokemonSprite = styled.img`
  height: 40px;
`;
