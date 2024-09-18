import toLower from 'lodash/toLower';
import { FC } from 'react';

const words = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const colors = ['#A770F6', '#3A93F9', '#FA7910'];

const AvatarIcon: FC<{ nickname: string; username: string; size?: number; className?: string; avatar?: string }> = (
  props,
) => {
  const { nickname, username, size = 32, className = '', avatar } = props;

  const first = toLower(username.charAt(0));
  const index = words.indexOf(first);
  const color = index === -1 ? colors[1] : colors[index % 3];

  return (
    <div
      className={'mr-[8px] text-text-1 text-12 text-center rounded-full overflow-hidden ' + className}
      style={{
        backgroundColor: avatar ? 'transparent' : color,
        width: size,
        height: size,
        lineHeight: size + 'px',
        fontSize: size * 0.375,
      }}
    >
      {avatar ? <img src={avatar} className="w-full h-full" /> : nickname.charAt(0)}
    </div>
  );
};

export default AvatarIcon;
