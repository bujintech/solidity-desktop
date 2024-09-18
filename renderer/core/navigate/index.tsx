import AvatarIcon from '@/components/avatar-icon';
import { FC } from 'react';
import NavigateList from './navigate-list';

const user = {
  avatar: '',
  username: 'season',
  nickname: 'season',
};

const Navigate: FC<{ className: string }> = ({ className }) => {
  return (
    <div className={'reset-border border-r-[1px] flex flex-col ' + className}>
      {/* <div className="p-[11px] box-border w-[48px]">
        <img src="/images/query-console-logo.png" alt="logo" className="w-[26px] h-[26px]" />
      </div> */}

      <div className="flex-1">
        <NavigateList />
      </div>

      <div className="text-center pb-[11px]">
        <AvatarIcon
          className="inline-block !mr-0"
          avatar={user?.avatar}
          username={user?.username || ''}
          nickname={user?.nickname || ''}
          size={24}
        />
      </div>
    </div>
  );
};

export default Navigate;
