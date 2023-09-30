import { createContext } from 'react';

type Type = {
  alert: (message?: string) => Promise<undefined>;
};

const AlertSimpleContext = createContext<Type>({
  alert: () => new Promise((_, reject) => reject()),
});

export default AlertSimpleContext;
