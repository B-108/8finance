import { InputDiv, InputTitle } from "./IOU.style";
import Input from "/src/components/Common/Input";
import { useState } from "react";

function IOU(){
  const [friendInfo, setFriendInfo] = useState<string>('')

  const handleFriendInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {setFriendInfo(event.target.value);};

  return(
      <>
      <InputDiv>
        <InputTitle>지인선택</InputTitle>
        <Input
          value={friendInfo}
          $active
          $size="90%,40px"
          onChange={handleFriendInfoChange}
          ></Input>
      </InputDiv>
      </>
  )
}

export default IOU


