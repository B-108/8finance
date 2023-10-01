import React from 'react';
import styled from 'styled-components';
import theme from '/src/themes';

const CancelConfirmation = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(187, 187, 187, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;

    .confirmation-box {
        width: 80%;
        max-width: 400px;
        height: 100px;
        background-color: ${theme.color.white};
        padding: 20px;
        border-radius: 10px;
        text-align: center;

        h2 {
            margin-bottom: 10px;
        }

        button {
            margin: 5px;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }

        button.cancel {
            background-color: ${theme.color.gray[40]};
            color: ${theme.color.white};
        }

        button.confirm {
            background-color: ${theme.color.green[0]};
            color: ${theme.color.white};
        }
    }
`;

interface ConfirmBoxProps {
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmBox: React.FC<ConfirmBoxProps> = ({ onCancel, onConfirm }) => {
    return (
        <CancelConfirmation>
            <div className="confirmation-box">
                <h2>작성을 취소하시겠습니까?</h2>
                <button className="confirm" onClick={onConfirm}>
                    네
                </button>
                <button className="cancel" onClick={onCancel}>
                    아니요
                </button>
            </div>
        </CancelConfirmation>
    );
};

export default ConfirmBox;
