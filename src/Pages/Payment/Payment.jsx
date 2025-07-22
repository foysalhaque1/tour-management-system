import React from 'react';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useParams } from 'react-router';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        const fetchPaymentIntent = async () => {
            const { data } = await axiosSecure.post('/create-payment-intent', { id });
            console.log(data)
            setClientSecret(data.clientSecret);
            setBookingData(data.bookingData);
        };
        fetchPaymentIntent();
    }, [id, axiosSecure]);

    const appearance = { theme: 'stripe' };
    const options = { clientSecret, appearance };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
            {clientSecret && bookingData && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} bookingData={bookingData} ></CheckoutForm>
                </Elements>
            )}
        </div>
    );
};

export default Payment;
