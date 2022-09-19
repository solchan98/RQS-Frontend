import { useLogout } from 'hooks/useLogout';
import { FormEventHandler, useState } from 'react';
import { createInviteToken } from 'service/spaces';

import cs from './createInviteLink.module.scss';

interface Props {
  spaceId: number;
}

export const CreateInviteLink = ({ spaceId }: Props) => {
  const [inviteLink, setInviteLink] = useState('');
  const [existLink, setExistLink] = useState(false);

  const saveLinkInClipboard = (link: string) => {
    navigator.clipboard.writeText(link).then(() => alert('클립보드에 복사되었습니다!'));
  };

  const logout = useLogout();
  const createInviteLink: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createInviteToken(spaceId)
      .then((data) => {
        const link = `http://random-quiz.shop/join/${data.inviteToken}`;
        // saveLinkInClipboard(link);
        setInviteLink(link);
        setExistLink((prev) => !prev);
      })
      .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
  };

  return (
    <form className={cs.inviteForm} id='createInviteLink' onSubmit={createInviteLink}>
      <input disabled value={inviteLink} />
      {!existLink && (
        <button className={cs.button} type='submit' form='createInviteLink'>
          초대 링크 생성
        </button>
      )}
    </form>
  );
};
