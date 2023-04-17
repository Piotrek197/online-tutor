import { createContext, ReactElement, SetStateAction, useState } from "react";

export type StateType = {
  username: string;
  password: string;
  accessToken: string;
  roles: number[];
};

type AuthContextType = {
  auth: StateType;
  setAuth: React.Dispatch<SetStateAction<StateType>>;
  persist: boolean;
  setPersist: React.Dispatch<SetStateAction<boolean>>;
};

type ChildrenType = {
  children: ReactElement | ReactElement[] | undefined;
};

const initContextState: AuthContextType = {
  auth: { username: "", password: "", accessToken: "", roles: [] },
  setAuth: () => {
    return null;
  },
  persist: false,
  setPersist: function (value: SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  }
};

const AuthContext = createContext<AuthContextType>(initContextState);

export const AuthProvider = ({ children }: ChildrenType): ReactElement => {
  const [auth, setAuth] = useState<StateType>(initContextState.auth);
  const [persist, setPersist] = useState(localStorage.getItem("persist") === "true" || false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
