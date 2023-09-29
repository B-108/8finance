import React, { ChangeEvent, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import theme from '/src/themes';
import Image from './Image';

interface InputProps {
    ref?: React.Ref<HTMLInputElement>; 
    
    children?: React.ReactNode;
    onClick?: () => void;
    value?: string | number | Date;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    type?: 'phone' | 'number' | 'money' | 'name' | 'day' | 'interest' | 'amount' | 'totalAmount' | 'pin';
    // 사이즈 설정
    $size?: string;
    // 활성 상태
    $active?: boolean;
    // 간편 비밀번호
    $simplepassword?: boolean;
    // 간편 비밀번호 입력 활성화
    $IsValue? : boolean;
    // 사진
    $buttonImage?: string;
}

const StyledInput = styled.input<InputProps>`
    // 기본값
    width: auto;
    height: auto;
    border: 1px solid black;
    font-size: ${theme.fontSize.DF_16};
    border-radius: ${theme.radius.S_10};
    line-height: ${(props) => props.$size?.split(',')[1]};

    // 사이즈 설정
    width: ${(props) => props.$size?.split(',')[0]};
    height: ${(props) => props.$size?.split(',')[1]};

    // 회원 관련 입력
    ${(props) =>
      props.$active &&
      css`
        border: 3px solid ${theme.color.gray[70]};
        font-size: ${theme.fontSize.DF_16};
        border-radius: ${theme.radius.S_10};
        padding : 0px 2.5% 0px 2.5%;
        
        &:focus {
          outline: 1px solid transparent;
          border: 3px solid ${theme.color.green[0]};
        }
      `}

    // 간편 비밀번호 입력
    ${(props) =>
        props.$simplepassword &&
        css`
            border: 1px solid ${theme.color.gray[100]};
            background-color: ${theme.color.gray[100]};
            font-size: ${theme.fontSize.DF_16};
            border-radius: 100%;
            aspect-ratio: 1 / 1;
            color: transparent;

            &:focus {
              outline: 1px solid ${theme.color.green[0]};
              border: 1px solid ${theme.color.green[0]}
            }
        `}

    ${(props) => props.$IsValue &&
      css`
        outline: 1px solid ${theme.color.green[0]};
        background-color: ${theme.color.green[0]};
        border: 1px solid ${theme.color.green[0]};
      `
    }

    // 타입이 "interest"인 경우 "%" 기호 표시
    ${(props) =>
        props.type === 'interest' &&
        css`
            position: relative;

            &:after {
                content: '%';
                position: absolute;
                right: 10px; // '%' 기호의 오른쪽 여백 조정
                top: 50%;
                transform: translateY(-50%);
            }
        `}
`;

// const Input = (props: InputProps) => {
//     return <StyledInput {...props}></StyledInput>;
// };

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <StyledInput {...props} ref={ref}></StyledInput>;
});

export default Input;

export const InputHeader = styled.div`
    width: fit-content;
    font-size: ${theme.fontSize.XS_12};
    color: #757575;
    margin-bottom: 40px;
    background-color: ${theme.color.white};
    position: absolute;
    left: 10%;
`;

export const InputDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const AccountInputHeader = styled(InputHeader)`
    margin-bottom: 40px;
`;

export const ButtonBox = styled.div`
    position: absolute;
    display: flex;
    justify-content: flex-end;
    margin-left: 35%;
    width: 52%;
`;

export const ButtonInput = (props: InputProps) => {
    return (
        <InputDiv>
            <StyledInput {...props}></StyledInput>
            <ButtonBox>
                {/* 이미지 버튼 추가해야 됨 */}
                {props.$buttonImage && <Image src={props.$buttonImage} alt="Button Image" width="25px" />}
            </ButtonBox>
        </InputDiv>
    );
};



// export const ButtonInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
//   return (
//       <InputDiv>
//           <StyledInput {...props} ref={ref}></StyledInput>
//           <ButtonBox>
//               {props.$buttonImage && <Image src={props.$buttonImage} alt="Button Image" width="30px" />}
//           </ButtonBox>
//       </InputDiv>
//   );
// });
