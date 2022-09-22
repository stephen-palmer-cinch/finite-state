import { EndScreenContainer } from "./styled";

type EndScreenComponentProps = {
  message: string;
};

export const EndScreenComponent = ({ message }: EndScreenComponentProps) => {
  return (
    <EndScreenContainer>
      <h1>{message}</h1>
    </EndScreenContainer>
  );
};
