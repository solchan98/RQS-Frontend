import { Zoom } from '@mui/material';

import cms from '../common.module.scss';
import cs from '../signUp.module.scss';

interface Props {
  checked: boolean;
  nextStep: () => void;
}

const Email = ({ checked, nextStep }: Props) => {
  const onSubmitHandler = () => {
    // TODO: validation
    nextStep();
  };

  return (
    <Zoom style={{ display: checked ? 'block' : 'none' }} in={checked}>
      <div className={cms.container}>
        <div className={cms.inputContainer}>
          <p className={cms.label}>Email</p>
          <input className={cms.input} placeholder='이메일을 입력해주세요.' onKeyDown={onSubmitHandler} />
          <button className={cs.signUpBtn} disabled type='submit'>
            이메일 중복 확인
          </button>
        </div>
      </div>
    </Zoom>
  );
};

export default Email;
