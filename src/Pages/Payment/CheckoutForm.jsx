import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';


const CheckoutForm = ({ bookingData,clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const {user} = useAuth()
    console.log(clientSecret)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setProcessing(true);

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: paymentMethod.id,
            }
        );

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            const paymentInfo = {
                transactionId: paymentIntent.id,
                bookingId: bookingData._id,
                amount: bookingData.price,
            };

            await axiosSecure.post('/payments', paymentInfo);

            navigate(`/dashboard/myBookings/${user.email}`);
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-4 border rounded" />
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={!stripe || processing}
            >
                {processing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default CheckoutForm;
