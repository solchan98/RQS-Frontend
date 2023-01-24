import { checkJoinSpace } from 'service/spaces';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { useModal } from 'hooks/useModal';
import { IJoinSpace } from 'types/space';

import { JoinModal } from './JoinModal';
import cs from './joinSpace.module.scss';
import { HStack, Input, PinInput, PinInputField } from '@chakra-ui/react';

export const JoinSpace = () => {
  const [spaceId, setSpaceId] = useState('');
  const onChangeSpaceId: ChangeEventHandler<HTMLInputElement> = (e) => setSpaceId(e.currentTarget.value);
  const [joinCode, setJoinCode] = useState('');
  const onChangeJoinCode = (val: string) => setJoinCode(val);

  const [joinSpace, setJoinSpace] = useState<IJoinSpace>({} as IJoinSpace);

  const joinModal = useModal();

  const onSuccessGetJoinSpaceHandle = (data: IJoinSpace) => {
    setJoinSpace(data);
    joinModal.openModal();
  };
  const getJoinSpace: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    checkJoinSpace(spaceId, joinCode)
      .then(onSuccessGetJoinSpaceHandle)
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <div className={cs.container}>
      <form className={cs.inputWrapper} onSubmit={getJoinSpace}>
        <div className={cs.space}>
          <div>스페이스 아이디</div>
          <Input className={cs.spaceId} width='auto' placeholder='스페이스 아이디' onChange={onChangeSpaceId} />
        </div>
        <div className={cs.code}>
          <div>참여 코드</div>
          <HStack>
            <PinInput value={joinCode} placeholder='👏' type='alphanumeric' mask onChange={onChangeJoinCode}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </div>
        <button className={cs.button} type='submit'>
          확인
        </button>
      </form>
      <JoinModal useModal={joinModal} joinSpace={joinSpace} joinCode={joinCode} />
    </div>
  );
};
