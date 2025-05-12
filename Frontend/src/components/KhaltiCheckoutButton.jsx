import { useEffect, useState } from "react";

const KhaltiCheckoutButton = ({
                                  amount,
                                  bookingId,
                                  onSuccess,
                                  onError,
                                  buttonText = "Pay with Khalti",
                                  disabled = false,
                              }) => {
    const [checkout, setCheckout] = useState(null);

    useEffect(() => {
        // Dynamically load Khalti script
        const script = document.createElement("script");
        script.src = "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.22.0.0.0/khalti-checkout.iffe.js";
        // script.src = "https://khalti.com/static/khalti-checkout-sandbox.js"; // Sandbox script
        script.async = true;

        script.onload = () => {
            const config = {
                publicKey: "9755adee6eaa431c946a66134f727adc", // sandbox key
                productIdentity: bookingId,
                productName: `Booking #${bookingId}`,
                productUrl: window.location.href,
                paymentPreference: [
                    "KHALTI",
                    "EBANKING",
                    "MOBILE_BANKING",
                    "CONNECT_IPS",
                    "SCT",
                ],
                eventHandler: {
                    onSuccess(payload) {
                        console.log("Payment Success:", payload);
                        onSuccess?.(payload);
                        verifyPayment(payload.idx, payload.txnId);
                    },
                    onError(error) {
                        console.error("Payment Failed:", error);
                        onError?.(error);
                    },
                    onClose() {
                        console.log("Widget closed");
                    },
                },
            };

            const khaltiCheckout = new window.KhaltiCheckout(config);
            setCheckout(khaltiCheckout);
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [bookingId, onSuccess, onError]);

    const verifyPayment = async (pidx, transaction_id) => {
        try {
            const res = await fetch(`/payments/khalti/verify?booking=${bookingId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pidx,
                    transaction_id,
                    amount: amount * 100, // in paisa
                }),
            });

            const data = await res.json();
            console.log("Verification Response:", data);
        } catch (err) {
            console.error("Verification failed:", err);
        }
    };

    return (
        <button
            onClick={() => checkout?.show({ amount: amount * 100 })}
            disabled={!checkout || disabled}
            className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 ${
                !checkout || disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            {!checkout ? "Loading..." : buttonText}
        </button>
    );
};

export default KhaltiCheckoutButton;
