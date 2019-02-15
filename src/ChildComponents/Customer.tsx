import React, {
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
  forwardRef
} from "react";

export interface CustomerRefProps {
  getCustomer: Function;
  setCustomer(val: string): void;
  selectedCustomer: string;
}
interface CustomerProps {
  Customer?: string;
  onCustomerChange: Function;
}
const Customer = forwardRef<CustomerRefProps, CustomerProps>(
  (props: CustomerProps, ref) => {
    const [selectedCustomer, setSelectedCustomer] = useState("");

    useImperativeHandle(
      ref,
      () => ({
        get selectedCustomer() {
          return selectedCustomer;
        },
        set selectedCustomer(val: string) {
          setSelectedCustomer(val);
        },
        getCustomer() {
          alert("Customer ===>" + selectedCustomer);
        },
        setCustomer(value: string) {
          setSelectedCustomer(value);
        }
      }),
      [selectedCustomer]
    );

    const onCustomerChange = (e: React.FormEvent<HTMLInputElement>) => {
      setSelectedCustomer(e.currentTarget.value);
      props.onCustomerChange(e.currentTarget.value);
    };

    return (
      <div>
        <label style={{ marginRight: "10px", width: "180px" }}>
          <b>Customer:</b>
        </label>
        <input value={selectedCustomer} onChange={onCustomerChange} />
      </div>
    );
  }
);

export default Customer;
