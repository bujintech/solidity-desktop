import { optionsList } from '@/config/config';
import useOptionBarHandler from '@/hooks/useOptionBarHandler';
import Icon from '@/icon';
import { colorsEnums } from '@/specific/enums';
import { ContentOptionsListType, EditorTabItemType } from '@/typings/interface';
import { monaco as monacoInstance } from '@cyberutopian/components/dist/code-editor/interface';
import { Tooltip } from 'antd';
import { CSSProperties, FC, Fragment, RefObject } from 'react';

const options = optionsList;

const OptionsBar: FC<{
  editorRef: RefObject<monacoInstance.editor.IStandaloneCodeEditor>;
  executionId?: number;
  activeTab?: EditorTabItemType;
  handleSaveMql: () => void;
}> = ({ editorRef, executionId, activeTab, handleSaveMql }) => {
  // mql 操作栏
  const optionHandler = useOptionBarHandler();

  // useEffect(() => {
  //   optionHandler.handleInitExecute(executionId);
  //   return () => {
  //     optionHandler.clearAsyncOperations();
  //   };
  // }, [executionId]);

  const actionEnable = (v: ContentOptionsListType): boolean => {
    if (activeTab?.readOnly && v.key === 'save') {
      return false;
    }

    // if (optionHandler.executeRunning) {
    //   if (v.key === 'stop') {
    //     return true;
    //   }
    // } else {
    //   if (v.key === 'stop') {
    //     return false;
    //   }
    // }
    return true;
  };

  const handleControl = (v: ContentOptionsListType) => {
    if (activeTab?.readOnly && v.key === 'save') {
      return;
    }

    switch (v.key) {
      case 'save':
        return handleSaveMql();
      // case 'stop':
      //   return optionHandler.handleStopExecute();
      case 'change':
        return optionHandler.handleTogglePanel();
      default:
        break;
    }
  };

  return (
    <Fragment>
      <ul className="py-[7px] px-[20px] flex border-b-[1px] border-line-2">
        {options.map((v) => {
          const enable = actionEnable(v);
          const disabled: CSSProperties = { cursor: 'not-allowed', color: colorsEnums['fill-6'] };
          const useable: CSSProperties = { cursor: 'pointer', color: v.color };

          return (
            <li className={'mr-[8px]'} key={v.key}>
              <Tooltip title={v.label}>
                {/* {optionHandler.executeRunning && v.key === 'execute' ? (
                  <CycleLoading className="mt-[6px] mx-[8px]" color="green" width={20} height={20} />
                ) : ( */}
                <Icon
                  type={v.icon}
                  className="title-20 h-[32px] box-border p-[8px] radius-8 hover:bg-fill-5"
                  onClick={enable ? () => handleControl(v) : undefined}
                  style={enable ? useable : disabled}
                />
                {/* )} */}
              </Tooltip>
            </li>
          );
        })}
      </ul>
      {/* {optionHandler.contextHolder} */}
    </Fragment>
  );
};

export default OptionsBar;
