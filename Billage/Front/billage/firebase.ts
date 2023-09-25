import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAPh70ZKTJEFPu1bhWtl9lbULsBJfBDaXg",
    authDomain: "billage-e8ecd.firebaseapp.com",
    databaseURL: "https://billage-e8ecd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "billage-e8ecd",
    storageBucket: "billage-e8ecd.appspot.com",
    messagingSenderId: "966839493773",
    appId: "1:966839493773:web:e94ea4d07518431cc46ec4",
    measurementId: "G-DYQY7WV645"
};

const VAPID_KEY = 'BLyXSyo5zKNbKpt0bBiMxn0_noRIgYSMudkZZO_cQPkw6lUy7A15vcjVrbxbKxOxTzGTlJqkNY-iO5t9wzcBLcY'
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            
            getToken(messaging, { vapidKey: VAPID_KEY })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log('currentToken', currentToken);
                        
                    } else {
                        console.log('No registration token available.');
                    }
                })
                .catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                });
        }
    });
}
requestPermission();

// onMessage(messaging, (payload) => {
//     console.log('Message received. ', payload);
//   });