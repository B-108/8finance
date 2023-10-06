import { useEffect } from 'react';
import { DialogContainer } from '../Util.style';
import Button from '../../Common/Button';

interface Props {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: Props) => {
  
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
    <DialogContainer>
      {/* <div className="overlay" onClickCapture={(e) => e.stopPropagation()} /> */}
      <div className="dialog">
        <div className="text">{message}</div>
          <Button
            $smallGreenBtn
            $size='55px,30px'
            onClick={onClose}>확인</Button>
      </div>
    </DialogContainer>
  );
};

export default Alert;
