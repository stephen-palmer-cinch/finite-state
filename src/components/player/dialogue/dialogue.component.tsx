import { DialogueContainer } from "./styled";

type DialogueComponentProps = {
  dialogue: string;
};
export const DialogueComponent = ({ dialogue }: DialogueComponentProps) => {
  return (
    <DialogueContainer>
      <div>{dialogue}</div>
    </DialogueContainer>
  );
};
