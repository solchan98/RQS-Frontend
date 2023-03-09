import jwtDecode from 'jwt-decode';
import { SetterOrUpdater } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { IMember, IMemberResponse, IMemberSubject } from 'types/member';

export const useLoginSuccess = (setMemberValue: SetterOrUpdater<IMember>) => {
  const nav = useNavigate();
  return (data: IMemberResponse) => {
    const { atk } = data;
    const decoded: { exp: number; iat: number; sub: string } = jwtDecode(atk);
    const { memberId, email, nickname, avatar }: IMemberSubject = JSON.parse(decoded.sub);
    setMemberValue((prev) => ({
      ...prev,
      memberId,
      email,
      nickname,
      avatar: avatar ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      isLoggedIn: true,
    }));
    nav('/');
  };
};
