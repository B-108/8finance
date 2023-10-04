export interface IOUProps {
    creditorUser: number;
    contractDebtorAcNum: string;
    contractMaturityDate: string;
    contractAutoTranYn: boolean;
    contractAutoDate: string;
    contractAmt: string;
    contractInterestRate: string;
    contractDueAmt: string;
}

export interface AgreeIOUProps {
    contractId: number;
    tranWd: string;
    tranWdAcNum: string;
    tranWdBankCode: string;
    tranDp: string;
    tranDpAcNum: string;
    tranDpBankCode: string;
    tranAmt: number;
    tranContent: string;
}