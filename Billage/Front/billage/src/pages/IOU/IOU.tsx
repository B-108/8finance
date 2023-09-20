import { InputDiv, InputTitle } from "./IOU.style";
import Input from "/src/components/Common/Input";
import { useState } from "react";

function IOU(){
  const [friendInfo, setFriendInfo] = useState<string>('')
  const [accountInfo, setAccountInfo] = useState<string>('');

  const handleFriendInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFriendInfo(event.target.value);
  };
  const handleAccountInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAccountInfo(event.target.value);
  };

  return (
      <>
          <InputDiv>
              <InputTitle>지인선택</InputTitle>
              <Input value={friendInfo} $active $size="90%,40px" onChange={handleFriendInfoChange}></Input>
          </InputDiv>
          <InputDiv>
              <InputTitle>돈 받을 계좌</InputTitle>
              <Input value={accountInfo} $active $size="90%,40px" onChange={handleAccountInfoChange}></Input>
          </InputDiv>
          <InputDiv>
              <InputTitle>돈 갚을 날짜</InputTitle>
              <Input value={friendInfo} $active $size="90%,40px" onChange={handleFriendInfoChange}></Input>
          </InputDiv>
          <InputDiv>
              <InputTitle>자동이체</InputTitle>
              <Input value={friendInfo} $active $size="90%,40px" onChange={handleFriendInfoChange}></Input>
          </InputDiv>
          <InputDiv>
              <InputTitle>빌릴 금액</InputTitle>
              <Input value={friendInfo} $active $size="90%,40px" onChange={handleFriendInfoChange}></Input>
          </InputDiv>
      </>
  );
}

export default IOU


