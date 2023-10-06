import { useState } from 'react';
import AlertSimpleContext from '/src/context/alertSimple/AlertSimpleContext';
import AlertSimple from './AlertSimple';
import CenteredContainer from '../../Common/CenterAlign';

type AlertState = {
  message: string;
  onClose: () => void;
};

const AlertSimpleDialog = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AlertState>();
  const [visible, setVisible] = useState(true)

  const alert = (message?: any): Promise<undefined> => {
    return new Promise((resolve) => {
      setState({
        message: message !== undefined ? `${message}` : '',
        onClose: () => {
          setState(undefined);
          resolve(undefined);
        },
      });
      setTimeout(() => {
        setState(undefined);
        resolve(undefined);
        setVisible(false)
      }, 3000);
    });
  };

  return (
    <CenteredContainer>
    <AlertSimpleContext.Provider value={{ alert }}>
      {children}
      {state && <AlertSimple message={state.message} onClose={state.onClose} visible={visible} />}
    </AlertSimpleContext.Provider>
    </CenteredContainer>
  );
};

export default AlertSimpleDialog;
