import { useEffect, useState } from "react";
import { createMachine, interpret } from "xstate";
import { useMachine } from "@xstate/react";

const smilesMachine = createMachine({
  id: "smilesState",
  initial: "idle",
  predictableActionArguments: true,
  schema: {
    events: {} as
      | { type: "RESOLVED" }
      | { type: "REJECTED" }
      | { type: "PENDING" }
      | { type: "RETRY" },
  },
  states: {
    idle: {
      on: {
        PENDING: { target: "pending" },
      },
    },
    pending: {
      on: {
        RESOLVED: { target: "success" },
        REJECTED: { target: "failure" },
      },
    },
    success: { type: "final" },
    failure: {
      on: {
        RETRY: { target: "pending" },
      },
    },
  },
});

export enum States {
  PENDING = "pending",
  SUCCESS = "success",
  FAILURE = "failure",
}

const smilesService = interpret(smilesMachine);

export interface SmilesData {
  data: {
    smiles: number;
  };
}

export const useFiniteState = (): [state: any, smiles: number] => {
  const [state, send] = useMachine(smilesMachine);
  const [smiles, setSmiles] = useState(0);

  smilesService.start();

  useEffect(() => {
    const fetchData = async () => {
      send("PENDING");
      try {
        const result: () => Promise<SmilesData> = () =>
          new Promise((res) =>
            setTimeout(() => res({ data: { smiles: 1 } }), 3000)
          );
        const {
          data: { smiles: smileCount },
        } = await result();

        setSmiles(smileCount);
        send("RESOLVED");
      } catch (error) {
        send("REJECTED");
      }
    };
    fetchData();
  }, []);

  return [state, smiles];
};
