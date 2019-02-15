import React, { useState, useRef, useEffect, forwardRef } from "react";

type ReadOnlyAccountProps = {
  readonly dummyAccountProp: string;
};

type PublicAccountMethods = {
  getAccounts(): void;
  setDestAccountVal(val: string): void;
  setSourceAccountVal(val: string): void;
  getSourceAccount(): string;
  getDestinationAccount(): string;
  alertCustomerNo(val: string): void;
  setCustomer(val: string): void;
};

type ReadWriteAccountProps = {
  sourceAccount: string;
  destinationAccount: string;
  customerNo: string;
};

export type AccountRefProps = ReadOnlyAccountProps &
  PublicAccountMethods &
  ReadWriteAccountProps;

interface AccountProps {
  name?: string;
  accountChange?: Function;
}

const Account = forwardRef<AccountRefProps, AccountProps>(
  (props: AccountProps, ref) => {
    const [sourceAccount, setSourceAccount] = useState("Account1");
    const [destinationAccount, setDestinationAccount] = useState("Account2");
    const [customerNo, setCustomerNo] = useState("");

    React.useImperativeHandle(
      ref,
      () => ({
        get dummyAccountProp() {
          return sourceAccount;
        },
        get sourceAccount() {
          return sourceAccount;
        },
        set sourceAccount(value: string) {
          setSourceAccount(value);
        },
        get destinationAccount() {
          return destinationAccount;
        },
        set destinationAccount(value: string) {
          setDestinationAccount(value);
        },
        get customerNo() {
          return customerNo;
        },
        set customerNo(value: string) {
          setCustomerNo(value);
        },
        setCustomer(val: string) {
          setCustomerNo(val);
        },
        getAccounts() {
          alert(
            "Source:" +
              sourceAccount +
              "--" +
              "Destination" +
              destinationAccount
          );
        },

        setDestAccountVal(val: string) {
          setDestinationAccount(val);
        },
        setSourceAccountVal(val: string) {
          setSourceAccount(val);
        },
        getDestinationAccount() {
          return destinationAccount;
        },
        getSourceAccount() {
          return sourceAccount;
        },
        alertCustomerNo(val: string) {
          alert(val);
        }
      }),
      [sourceAccount, destinationAccount]
    );

    const changeState = (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.name === "source") {
        setSourceAccount(e.currentTarget.value);
      } else {
        setDestinationAccount(e.currentTarget.value);
      }
      props.accountChange && props.accountChange(e);
    };

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <label style={{ marginRight: "10px", width: "180px" }}>
                  <b>Source Account:</b>
                </label>
              </td>
              <td>
                <input
                  name="source"
                  onChange={changeState}
                  value={sourceAccount}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label style={{ marginRight: "10px", width: "180px" }}>
                  <b>Destination Account:</b>
                </label>
              </td>
              <td>
                <input
                  name="dest"
                  onChange={changeState}
                  value={destinationAccount}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>
                  <b>Selected Customer:</b>
                </label>
              </td>
              <td>
                <label>{customerNo}</label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <b>Name Props Val :</b>
                </label>
              </td>
              <td>
                <label> {props.name}</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
);

export default Account;
