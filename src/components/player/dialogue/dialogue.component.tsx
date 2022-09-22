import { DialogueContainer } from "./styled";

type DialogueComponentProps = {
  dialogue: string;
};
export const DialogueComponent = ({ dialogue }: DialogueComponentProps) => {
  return (
    <DialogueContainer>
      <h4>{dialogue}</h4>
    </DialogueContainer>
  );
};
