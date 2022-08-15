import { ChangeEventHandler, useState } from 'react';

import cs from './searchBar.module.scss';
import { Search } from '../../../../assets/svgs';

export const SearchBar = () => {
  const [text, setText] = useState('');

  const onChangeText: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setText(value);
  };

  return (
    <form className={cs.searchBar}>
      <button type='submit'>
        <Search width='22' height='22' color='#5B5B5B' />
      </button>
      <input value={text} placeholder='Search space...' onChange={onChangeText} />
    </form>
  );
};
