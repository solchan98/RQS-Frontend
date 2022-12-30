import Countdown from 'react-countdown';
import { CountdownRendererFn, CountdownRenderProps } from 'react-countdown/dist/Countdown';

const renderer: CountdownRendererFn = ({ formatted }: CountdownRenderProps) => {
  return (
    <span>
      {formatted.minutes}:{formatted.seconds}
    </span>
  );
};

interface IProps {
  date: number;
}

export const Timer = ({ date }: IProps) => {
  return (
    <p>
      <Countdown date={date} renderer={renderer} />
    </p>
  );
};
