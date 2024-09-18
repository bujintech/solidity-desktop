import { FC, HTMLAttributes, useMemo } from 'react';
import styles from './cycle.module.scss';

const CycleLoading: FC<{ width: number; height: number; color: 'green' | 'blue' } & HTMLAttributes<HTMLDivElement>> = ({
  width,
  height,
  color,
  ...restProps
}) => {
  const url = useMemo(() => (color === 'blue' ? 'cyber-loading-b.png' : 'cyber-loading.png'), [color]);

  return (
    <div
      {...restProps}
      className={styles['loading'] + ' ' + restProps.className}
      style={{
        ...restProps.style,
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(/images/${url})`,
      }}
    ></div>
  );
};

export default CycleLoading;
