import { Viewer } from '@toast-ui/react-editor';

interface Props {
  content: string;
}

const ToastViewer = ({ content }: Props) => {
  return <Viewer initialValue={content} />;
};

export default ToastViewer;
