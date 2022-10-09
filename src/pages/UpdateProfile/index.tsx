import { ChangeEventHandler, useState } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { memberState } from 'recoil/atoms/member';

import cs from './updateProfile.module.scss';

export const UpdateProfile = () => {
  const { memberId } = useParams();
  const [isAccessible, setIsAccessible] = useState(true);

  const [member, setMember] = useRecoilState(memberState);
  const [nickname, setNickname] = useState(member.nickname); // TODO: api call the GET_MEMBER_INFO

  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => setNickname(e.currentTarget.value);

  // const onSuccessCheckRequest = (accessible: boolean) => {
  //   setIsAccessible(accessible);
  //   if (!accessible) {
  //     alert('접근할 수 없습니다.');
  //     nav(-1);
  //   }
  // };
  //
  // const nav = useNavigate();
  // const logout = useLogout();
  // const onError = (err: AxiosError<{ message: string }>) => {
  //   if (err.response?.status === 401) {
  //     logout();
  //   } else {
  //     nav(-1);
  //     alert(err.response?.data.message);
  //   }
  // };
  //
  // useQuery([`$member_verify_${memberId}`], () => checkIsUpdatable(), {
  //   select: (accessible): boolean => accessible,
  //   onSuccess: (accessible) => onSuccessCheckRequest(accessible),
  //   onError: (err: AxiosError<{ message: string }>) => onError(err),
  // });

  if (!isAccessible) return <div>권한 확인중...</div>;

  return (
    <div className={cs.container}>
      <div className={cs.title}>프로필 수정</div>
      <div className={cs.top}>
        <img src={member.avatar} alt='avatar' />
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
        <form id='updateProfile'>
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
