import { useState } from 'react';
import Notification from '/src/components/Notification/Notification';

function Notifications() {
    const data = [
        {
            data: 1,
        },
    ];

    const [notificationInfo, setNotificationInfo] = useState<string>('');

    return (
        <>
            <Notification></Notification>
            <Notification></Notification>
            <Notification></Notification>
            <Notification></Notification>
        </>
    );
}

export default Notifications;
