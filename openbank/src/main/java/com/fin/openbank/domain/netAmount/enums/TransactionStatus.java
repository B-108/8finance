package com.fin.openbank.domain.netAmount.enums;

public enum TransactionStatus {
    SEND("Money to Send"), // 돈을 보내야하는 상태
    RECEIVE("Money to Receive"), // 돈을 받아야하는 상태
    NONE("No need to move money"); // 차액이 0인 상태

    private final String status;

    TransactionStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
