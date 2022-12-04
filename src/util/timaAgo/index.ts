import TimeAgo from 'javascript-time-ago';
import ko from 'javascript-time-ago/locale/ko';

TimeAgo.addDefaultLocale(ko);
const timeAgo = new TimeAgo('ko');

export default timeAgo;
