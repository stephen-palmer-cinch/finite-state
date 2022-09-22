import { ActionComponentButton } from "./styled";

type ActionComponentProps = {
  name: string;
  action?: () => void;
};

export const ActionComponent = ({ name, action }: ActionComponentProps) => {
  return <ActionComponentButton>{name}</ActionComponentButton>;
};
