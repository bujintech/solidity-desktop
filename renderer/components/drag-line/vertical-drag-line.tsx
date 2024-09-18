import { CSSProperties, FC, useRef, useState } from 'react';
import Draggable, { DraggableBounds, DraggableData } from 'react-draggable';

const VerticalDragLine: FC<{
  initHeight: number;
  offsetHeight: number;
  className?: string;
  style?: CSSProperties;
  position?: { x: number; y: number };
  bounds?: DraggableBounds;
  onChange: (v: number, data: DraggableData) => void;
}> = ({ className, style, initHeight, offsetHeight, bounds, position, onChange }) => {
  const [footerPosition, setFooterPosition] = useState({ x: 0, y: 0 });

  const footerNodeRef = useRef(null);

  return (
    <div
      className={`h-[3px] flex absolute right-0 left-0 z-50 flex-col bg-transparent ` + className}
      style={{ ...(style || {}), top: `${initHeight}px` }}
    >
      <Draggable
        axis="y"
        nodeRef={footerNodeRef}
        position={position || footerPosition}
        bounds={bounds || { top: offsetHeight - initHeight, bottom: 300 }}
        onDrag={(e, data) => {
          const newHeight = initHeight + data.y;
          setFooterPosition({ x: 0, y: data.y });
          return onChange(newHeight, data);
        }}
      >
        <div ref={footerNodeRef} className={`w-full cursor-ns-resize bg-transparent hover:bg-fill-6 h-[3px]`}></div>
      </Draggable>
    </div>
  );
};

export { VerticalDragLine };
