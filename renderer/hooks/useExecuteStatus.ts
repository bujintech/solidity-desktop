import useCountdown from '@/hooks/useCountdown';
// import { cyberFetch } from '@/service';
import { message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { EditorTabItemType } from '../pages/solidity-editor/interface';

const useExecuteStatus = (
  messageApi: MessageInstance,
  activeTab?: EditorTabItemType,
  projectId?: number,
  queryId?: number,
  executionId?: number,
) => {
  const { count, restartCountdown } = useCountdown(5);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ status: string; time?: number; isFirst: boolean }>({
    status: '',
    time: undefined,
    isFirst: true,
  });

  const afterFirstRequest = useRef(false);

  const resetStatus = () => {
    setStatus({ status: '', time: undefined, isFirst: false });
  };

  const queryExecuteResultRequest = () => {
    // 第一次不展示loading
    setLoading(true);

    // return cyberFetch['GET/api/v1/query/:projectId/:queryId/:executionId']({
    //   url: `/api/v1/query/${projectId}/${queryId}/${executionId}`,
    // });
  };

  useLayoutEffect(() => {
    afterFirstRequest.current = false;
  }, [activeTab?.key]);

  useEffect(() => {
    if (!executionId) {
      setLoading(false);
    }
  }, [executionId]);

  useEffect(() => {
    if (!executionId || afterFirstRequest.current) return;
    queryExecuteResultRequest()?.then((v) => {
      afterFirstRequest.current = true;

      if (v.code === '200') {
        setStatus({ status: v.data.status, time: performance.now(), isFirst: true });

        switch (v.data?.status) {
          case 'wait':
          case 'scanning':
            // 第一次请求的响应，必须响应
            restartCountdown(5);
            break;
          case 'failed':
          case 'succeed':
          case 'terminated':
          default:
            setLoading(false);
            break;
        }
      }
    });
  }, [executionId]);

  useEffect(() => {
    if (!executionId || count > 0 || !afterFirstRequest.current) return;
    // 非第一次请求
    queryExecuteResultRequest()?.then((v) => {
      if (v.code === '200') {
        setStatus({ status: v.data.status, time: performance.now(), isFirst: false });

        switch (v.data?.status) {
          case 'wait':
          case 'scanning':
            restartCountdown(5);
            break;
          case 'terminated':
            messageApi.open({
              key: 'stop',
              type: 'success',
              content: '已停止mql的执行任务',
              duration: 2,
            });
            setLoading(false);
            break;
          case 'failed':
            message.error('mql的任务执行失败');
            setLoading(false);
            break;
          case 'succeed':
            setLoading(false);
            break;
          default:
            break;
        }
      }
    });
  }, [executionId, count]);

  return { resetStatus, loading, executeStatus: status };
};

export default useExecuteStatus;
