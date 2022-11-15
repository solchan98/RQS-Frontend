import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { forwardRef } from 'react';

interface Props {
  placeHolder: string;
}

const ToastEditor = forwardRef<Editor, Props>(({ placeHolder }, ref) => {
  return (
    <Editor
      ref={ref} // DOM 선택용 useRef
      placeholder={placeHolder}
      previewStyle='tab' // 미리보기 스타일 지정
      initialEditType='markdown' //
      hideModeSwitch
      toolbarItems={[
        // 툴바 옵션 설정
        ['heading', 'bold'],
        ['ul', 'link'],
        ['code'],
      ]}
      useCommandShortcut={false} // 키보드 입력 컨트롤 방지 v
    />
  );
});

ToastEditor.displayName = 'ToastEditor';

export default ToastEditor;
