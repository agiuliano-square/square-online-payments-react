import styles from "../styles/Home.module.css";
import {
  ApplePay,
  GooglePay,
  CreditCard,
  PaymentForm,
} from "react-square-web-payments-sdk";

export default function Home() {
  return (
    <div className={styles.container}>
      <PaymentForm
        applicationId="sandbox-XXXXXX"
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          const response = await fetch("/api/pay", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              sourceId: token.token,
            }),
          });
          console.log(await response.json());
        }}
        createPaymentRequest={() => ({
          countryCode: "US",
          currencyCode: "USD",
          total: {
            amount: "1.00",
            label: "Total",
          },
        })}
        locationId="XXXXXXXXXX"
      >
        <ApplePay />
        <GooglePay />
        <CreditCard
          buttonProps={{
            css: {
              backgroundColor: "#771520",
              fontSize: "14px",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#530f16",
              },
            },
          }}
        />
      </PaymentForm>
    </div>
  );
}
