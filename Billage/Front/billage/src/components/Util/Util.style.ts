import { styled, keyframes, css } from "styled-components";
import theme from "/src/themes";

//배경 클릭 시 나와야 되나?



export const DialogContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 99%;
  height: 99%;
  overflow: hidden;
  background-color: rgb(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  
  z-index: 9999;
  
  /* .overlay {
    width: 100%;
    height: 100%;
  } */

  .dialog {
    /* position: absolute; */
    /* top: 38%; */
    /* left: 50%; */
    /* transform: translate(-50%, 0); */

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 255px;
    height: 100px;
    padding: 20px;
    background-color: white;
    border-radius: ${theme.radius.S_10};
    box-shadow: 0 0 10px rgba(0, 0, 5, 0.3);
    
    .title {
      margin: 0 0 20px 0;
    }

    .text {
      text-align: center;
      font-size: ${theme.fontSize.L_24};
      margin-bottom: 17px;
      /* border: 1px solid red; */

    }

    .buttons {
      display: flex;
      justify-content: space-between;
      width: 125px;
      /* border: 1px solid red; */
    }


    /* .buttons button {
      border: none;
      background-color: #132b31;
      color: white;
      text-transform: uppercase;
      transition: all 0.2s;
      font-weight: medium;
      border-radius: 4px;
      margin: 0 5px;
      width: 70px;
      height: 28px;
      cursor: pointer;
    } */

    .input {
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
      margin-top: 10px;
    }

    .buttons button:hover {
      
      background-color: #2a606e;
      color: white;
      border: 1px solid #6c6c6c;
    }

    .buttons button:focus {
      /* border: 1px solid #6c6c6c; */
      border: none;
      border-radius: 4px;
    }
    
  }
`;

const slideIn = keyframes`
  from  {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

export const SimpleDialogContainer = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: 11vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 55px;
  border: 1px solid #CBCBCB;
  border-radius: ${theme.radius.S_10};
  backdrop-filter: blur(3px);
  background: rgba(239, 239, 239, 0.8);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  

  ${( props ) =>
    props.$visible
      ? css`
          animation: ${slideIn} 0.3s forwards;
        `
      : css`
          animation: ${slideOut} 0.3s forwards;
        `};

  .text {
    text-align: center;
    font-size: ${theme.fontSize.DF_16};
  }
`;


