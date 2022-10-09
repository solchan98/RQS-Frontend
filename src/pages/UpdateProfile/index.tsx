import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import store from 'store';
import jwtDecode from 'jwt-decode';
import { useMount } from 'react-use';
import { useSetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

import { useLogout } from 'hooks/useLogout';
import { getMemberInfo, updateMemberInfo } from 'service/member';
import { memberState } from 'recoil/atoms/member';
import { IMember } from 'types/member';

import cs from './updateProfile.module.scss';

export const UpdateProfile = () => {
  const { memberId } = useParams();
  const [isAccessible, setIsAccessible] = useState(true);

  const setMemberState = useSetRecoilState(memberState);
  const [avatar, setAvatar] = useState('');
  const [nickname, setNickname] = useState(''); // TODO: api call the GET_MEMBER_INFO

  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => setNickname(e.currentTarget.value);
  const nav = useNavigate();
  const getSubjectInAtk = () => {
    const atk = store.get('atk');
    const decoded: { exp: number; iat: number; sub: string } = jwtDecode(atk);
    return JSON.parse(decoded.sub);
  };
  const validate = (subject: { memberId: number }) => {
    if (subject.memberId !== Number(memberId)) {
      alert('접근할 수 없습니다.');
      nav(-1);
    }
  };

  const logout = useLogout();
  const setupMember = () => {
    getMemberInfo()
      .then((data) => setNickname(data.nickname))
      .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
  };

  useMount(() => {
    const subject = getSubjectInAtk();
    validate(subject);
    setIsAccessible(true);
    setupMember();
  });

  const onSuccessUpdateProfile = (data: IMember) => {
    setNickname(data.nickname);
    setMemberState(data);
    alert('프로필이 변경되었습니다.');
    nav(-1);
  };

  const onSubmitMemberUpdate: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateMemberInfo(nickname)
      .then((data) => onSuccessUpdateProfile(data))
      .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
  };

  if (!isAccessible) return <div>권한 확인중...</div>;

  return (
    <div className={cs.container}>
      <div className={cs.title}>프로필 수정</div>
      <div className={cs.top}>
        <img src={avatar} alt='avatar' />
        <div className={cs.updateAvatar}>
          <button type='button'>이미지 바꾸기</button>
          <form id='updateAvatar'>
            <button type='submit' form='updateAvatar'>
              이미지 저장
            </button>
          </form>
        </div>
      </div>
      <div className={cs.middle}>
        <form id='updateProfile' onSubmit={onSubmitMemberUpdate}>
          <div className={cs.updateInfoWrapper}>
            <span className={cs.label}>Nickname</span>
            <input type='text' value={nickname} onChange={onChangeNickname} />
          </div>
        </form>
      </div>
      <div className={cs.bottom}>
        <button type='submit' form='updateProfile'>
          변경 진행
        </button>
      </div>
    </div>
  );
};
