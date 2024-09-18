import { FC, Fragment } from 'react';
import ProjectMql from './resource-file';
import ResourceBar from './resource-file/resource-bar';

const PanelContent: FC<{ contentHeight: number; mqlHeight: number; width: number }> = ({
  contentHeight,
  mqlHeight,
  width,
}) => {
  return (
    <Fragment>
      <div className="flex flex-col reset-border" style={{ height: `${mqlHeight}px`, width: `${width}px` }}>
        <ResourceBar />
        <ProjectMql className="overflow-y-scroll flex-1" />
      </div>
      {/* <MqlHistory contentHeight={contentHeight - mqlHeight} /> */}
    </Fragment>
  );
};

export default PanelContent;
