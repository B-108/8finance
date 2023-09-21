import styled from 'styled-components';
import Image from '../Common/Image';
import receiveMoney from '/src/assets/receiveMoney.svg';

const NotificationContainer = styled.div`
    background-color: #fff;
    color: #333;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function Notification() {
    return (
        <div>
            <div style={{ height: '100%', display: 'flex', justifyContent: 'space-around', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image src={receiveMoney} alt="home" width="35px"></Image>
                </div>
                <div>
                    <div>~님이 ~원을 갚았습니다.</div>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Notification;
