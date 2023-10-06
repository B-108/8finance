import { useEffect } from 'react';
import { SimpleDialogContainer } from '../Util.style';
import Button from '../../Common/Button';

interface Props {
  message: string;
  onClose: () => void;
  visible: boolean;
}

const AlertSimple = ({ message, onClose, visible }: Props) => {
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <SimpleDialogContainer $visible={visible}>
        <div className="text">{message}</div>
    </SimpleDialogContainer>
  );
};

export default AlertSimple;
