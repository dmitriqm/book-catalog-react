import { createContext, FC} from "react";
import type { Firestore } from "firebase/firestore";

interface AppContextInterface {
  value: ProviderValues;
  children?: JSX.Element | JSX.Element[];
}

interface ProviderValues {
  firestore: {
    db: Firestore;
  };
}

const AppContext = createContext<ProviderValues>({} as ProviderValues);

export const AppContextProvider = ({
  value,
  children,
}: AppContextInterface) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
