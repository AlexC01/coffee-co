# Coffee Co

A personal e-commerce platform built with Next.js, Firebase, and Stripe. This project demonstrates a complete, end-to-end e-commerce flow, from product display to secure payment processing and order management.

Note: This is a personal project intended for demonstration purposes only. It uses Stripe's test credit card numbers for all transactions and does not process real payments.

## Key Features

- **Secure Payment Processing:** Integrated with Stripe to handle all credit card payments securely.

- **Firebase Cloud Functions:** A robust backend powered by serverless functions.

- **Stripe Webhook:** A webhook listener to securely and reliably process successful payments and update the database.

- **Real-time Order Tracking:** Utilizes Firestore's onSnapshot listener to provide users with a real-time view of their order status after a successful payment.

- **Secure Database Management:** All sensitive order information is stored in Firestore, ensuring data integrity and security.
