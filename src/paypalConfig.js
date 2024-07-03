import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalOptions = {
    "client-id": "AelszCh1XKS7Fi7jr9mdikoHOCUpKeIGpvbs0gYwZ3WDsP--kSDnzmYCh2su6yTDBWZwOvobBPgCbbQs",
    currency: "USD",
};

const PayPalProvider = ({ children }) => (
    <PayPalScriptProvider options={paypalOptions}>
        {children}
    </PayPalScriptProvider>
);

export default PayPalProvider;
