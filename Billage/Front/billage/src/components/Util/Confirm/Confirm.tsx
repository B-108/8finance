import { useEffect } from 'react';
import { DialogContainer } from '../Util.style';
import Button from '../../Common/Button';

interface Props {
  message: string;
  onClickOK: () => void;
  onClickCancel: () => void;
}

const Confirm = ({ message, onClickOK, onClickCancel }: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClickCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClickCancel]);

  return (
    <DialogContainer>
      {/* <div className="overlay" onClickCapture={(e) => e.stopPropagation()} /> */}
      <div className="dialog">
        <div className="text">{message}</div>
        <div className="buttons">
          <Button
            $smallGreenBtn
            $size='55px,30px'
            onClick={onClickOK}>네</Button>
          <Button
            $smallGrayBtn
            $size='60px,30px'
            onClick={onClickCancel}>아니요</Button>
        </div>
      </div>
    </DialogContainer>
  );
};

export default Confirm;
