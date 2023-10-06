import { atom } from 'recoil';
import { NotificationType } from '../type/noti';

// Recoil 상태 정의
export const NotificationState = atom<NotificationType[]>({
    key: 'NotificationState',
    default: [{
      contractId : 0,
      noticeAmount: 0,
      noticeId: 0,
      noticeKeyword: 0,
      noticeSendDate: '', 
      noticeState: 0,
      noticeType: 0, 
      noticeUserName:""
    }]
  });