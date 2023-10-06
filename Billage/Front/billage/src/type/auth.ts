export interface SignUpProps {
  userCellNo: string,
  userName: string,
  userSimplePass: string,
}

export interface LoginProps {
  userCellNo: string,
  userSimplePass: string,
}

export interface MessageProps{
  to : string
}

export interface MessageCertProps{
  phoneNumber : string,
  verifyNumber : string
}

