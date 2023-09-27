export interface Transaction{
    accountBankCode : string,
    accountNum : string
  }
  
  export interface UserType {
    userPk: number;
    userSeqNo: number | null;
    userCellNo: string;
    userName: string;
    userInfo: string | null;
  }


  export interface TransactionType {
    contractId: number;
    creditorUser: UserType;
    debtorUser: UserType;
    contractAmt: number;
    contractState: number;
    repaymentCash: number;
  }

  export interface TransactionDetailType{
    contractMaturityDate : string;
    contractStartDate : string;
    contractAmt : number;
    contractInterestRate : number;
    repaymentCash : number;
  }