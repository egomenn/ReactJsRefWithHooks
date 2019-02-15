import React, {
  useState,
  useRef,
  useImperativeMethods,
  useEffect,
  forwardRef
} from "react";

import Account, { AccountRefProps } from "./ChildComponents/Account";
import Customer, { CustomerRefProps } from "./ChildComponents/Customer";

function MoneyTransfer() {
  const [sourceAccount, setSourceAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [customer, setSelectedCustomer] = useState("");
  const [inputSourceAccountState, setInputSourceAccount] = useState("");
  const [inputDestAccountState, setInputDestAccount] = useState("");

  const [nameState, setName] = useState("");

  const accountRef = useRef<AccountRefProps>(null);
  const customerRef = useRef<CustomerRefProps>(null);

  const submitButton = (e: React.FormEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === "source") {
      setSourceAccount(accountRef.current.sourceAccount);
      setName(e.currentTarget.name);
    } else {
      setDestinationAccount(accountRef.current.destinationAccount);
      setName(e.currentTarget.name);
    }
  };

  const onAccountChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "sourceText") {
      setInputSourceAccount(e.currentTarget.value);
    } else {
      setInputDestAccount(e.currentTarget.value);
    }
  };

  const setterHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    const inputName = e.currentTarget.name;
    if (inputName === "source") {
      accountRef.current.sourceAccount = inputSourceAccountState;
    } else if (inputName === "customer") {
      accountRef.current.customerNo = customer;
      customerRef.current.selectedCustomer = customer;
    } else {
      accountRef.current.destinationAccount = inputDestAccountState;
    }
  };

  const CustomerChanged = (customerNo: string) => {
    setSelectedCustomer(customerNo);
    setCustomerInAccountComponent(customerNo);
  };

  const setCustomerInAccountComponent = (customerNo: string) => {
    accountRef.current.setCustomer(customerNo);
  };

  const onCustomerTextChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedCustomer(e.currentTarget.value);
  };
  return (
    <div style={{ width: "110%", margin: "15px 50px", float: "left" }}>
      <fieldset style={{ width: "80%" }}>
        <legend>Money Transfer(Parent)</legend>
        <table style={{ width: "80%", alignContent: "center" }}>
          <tbody>
            <tr>
              <td>
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  name="source"
                  onClick={setterHandler}
                >
                  Set Source Account
                </button>
              </td>
              <td>
                <input
                  name="sourceText"
                  value={inputSourceAccountState}
                  onChange={onAccountChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  name="source"
                  onClick={submitButton}
                >
                  GetSourceAccount
                </button>
              </td>
              <td>
                <input disabled value={sourceAccount} />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  name="destButton"
                  onClick={setterHandler}
                >
                  Set Dest Account
                </button>
              </td>
              <td>
                <input
                  name="destText"
                  value={inputDestAccountState}
                  onChange={onAccountChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  name="dest"
                  onClick={submitButton}
                >
                  GetDestinationAccount
                </button>
              </td>
              <td>
                <input disabled value={destinationAccount} />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  name="customer"
                  onClick={setterHandler}
                >
                  Set Customer
                </button>
              </td>
              <td>
                <input name="sourceText" onChange={onCustomerTextChanged} />
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <b>Customer:</b>
                </label>
              </td>
              <td>
                <input disabled value={customer} />
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <b>Account:</b>
                </label>
              </td>
              <td>
                <input disabled value={inputSourceAccountState + "(Source)"} />
                <label>==></label>
                <input
                  disabled
                  value={inputDestAccountState + "(Destination)"}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <fieldset style={{ marginTop: "50px", width: "45%", float: "left" }}>
          <legend>Account Component(Child)</legend>
          <div>
            <Account ref={accountRef} name={nameState} />
          </div>
        </fieldset>
        <fieldset
          style={{
            width: "45%",
            float: "right",
            height: "125px",
            marginTop: "50px"
          }}
        >
          <legend>Customer Component(Child)</legend>
          <div>
            <Customer ref={customerRef} onCustomerChange={CustomerChanged} />
          </div>
        </fieldset>
      </fieldset>
    </div>
  );
}

export default MoneyTransfer;
