import { Zoom } from '@mui/material';

import cms from '../common.module.scss';

interface Props {
  checked: boolean;
  nextStep: () => void;
}

const Nickname = ({ checked, nextStep }: Props) => {
  const onSubmitHandler = () => {
    // TODO: validation
    nextStep();
  };
  return (
    <Zoom style={{ display: checked ? 'block' : 'none' }} in={checked}>
      <div className={cms.container}>
        <p className={cms.label}>Nickname</p>
        <div className={cms.inputContainer}>
          <input className={cms.input} placeholder='닉네임을 입력해주세요.' onKeyDown={onSubmitHandler} />
        </div>
      </div>
    </Zoom>
  );
};

export default Nickname;
