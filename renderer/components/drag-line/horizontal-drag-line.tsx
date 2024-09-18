import { CSSProperties, FC, useRef, useState } from 'react';
import Draggable, { DraggableBounds } from 'react-draggable';

const HorizontalDragLine: FC<{
  initWidth: number;
  offsetWidth: number;
  style?: CSSProperties;
  position?: { x: number; y: number };
  bounds?: DraggableBounds;
  onChange: (v: number) => void;
}> = ({ initWidth, offsetWidth, style, position, bounds, onChange }) => {
  const [footerPosition, setFooterPosition] = useState(position);
  const nodeRef = useRef(null);

  return (
    <div
      className={`w-[3px] flex absolute z-50 bottom-0 top-0 bg-transparent`}
      style={{ ...(style || {}), left: `${initWidth}px` }}
    >
      <Draggable
        axis="x"
        nodeRef={nodeRef}
        position={footerPosition}
        bounds={bounds || { right: initWidth - offsetWidth, left: -100 }}
        onDrag={(e, data) => {
          const newWidth = initWidth + data.x;
          setFooterPosition({ x: data.x, y: 0 });
          return onChange(newWidth);
        }}
      >
        <div ref={nodeRef} className={`h-full cursor-ew-resize bg-transparent hover:bg-fill-6 w-[3px]`}></div>
      </Draggable>
    </div>
  );
};

export { HorizontalDragLine };
