export interface AccountProps{
  accountBankCode : string,
  accountNum : string
}

export interface AccountType {
  accountBankCode: string;
  accountId: number;
  accountMainYn: boolean;
  accountNum: string;
  accountRegistDate: string;
}

export interface BankType {
  logo: string;
  code?: string,
  bankName: string;
}