import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = JSON.parse(
	process.env.FIREBASE_ADMIN_CREDENTIALS as string,
);

const app =
	getApps().length === 0
		? initializeApp({ credential: cert(serviceAccount) })
		: getApps()[0];

const adminAuth = getAuth(app);

export { adminAuth };
