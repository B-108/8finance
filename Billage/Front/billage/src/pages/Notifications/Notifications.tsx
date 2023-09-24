import { useState } from 'react';
import Notification from '/src/components/Notification/Notification';
import Header from '/src/components/Header/Header';
import CenteredContainer from '/src/components/Common/CenterAlign';

function Notifications() {
    const data = [
        {
            data: 1,
        },
    ];

    const [notificationInfo, setNotificationInfo] = useState<string>('');

    return (
        <CenteredContainer>
            <Header
                headerTitle="알림
            "
            ></Header>
            <div style={{ display: 'flex' }}>
                <Notification></Notification>
            </div>
        </CenteredContainer>
    );
}

export default Notifications;
