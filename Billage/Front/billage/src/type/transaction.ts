export interface Transaction{
    accountBankCode : string,
    accountNum : string
  }
  
  export interface TransactionType {
    contractId: number;
    creditorUser: string;
    debtorUser: string;
    contractAmt: string;
    contractState: number;
    repatmentCash: string;
  }