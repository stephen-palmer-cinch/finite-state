import styled from "styled-components";

export const NameContainer = styled.div`
  border-radius: 20px;
  border: solid 2px black;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 50%;
`;

export const NameTitle = styled.div`
  font-size: 20px;
`;

export const Level = styled.div`
  margin-left: 10px;
  font-size: 12px;
`;

export const HealthBar = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  border: 2px solid black;
  height: 20px;
`;

export const CurrentHealth = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  height: 10px;
  background-color: red;
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HealthNumber = styled.div`
  font-size: 12px;
`;
