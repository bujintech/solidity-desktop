/*
 * @Author: zhouxishun
 * @Date: 2024-03-18 14:24:17
 * @LastEditors: zhouxishun
 * @LastEditTime: 2024-04-12 11:17:58
 * @Description:项目mql历史，前缀添加与删除
 */

import { PrefixEnums } from '../config/config';

const usePrefix = () => {
  const addPrefix = (value: number, prefix: PrefixEnums) => {
    return `${prefix}-${value}`;
  };

  const removePrefix = (value: string | undefined, prefix: PrefixEnums) => {
    if (!value) return undefined;
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return undefined;
    const result = value.includes(prefix) ? value.replace(`${prefix}-`, '') : value;

    return Number.isNaN(Number(result)) ? undefined : Number(result);
  };

  const addSuffix = (name: string) => {
    return name.endsWith('.mql') ? name : `${name}.mql`;
  };

  return { addPrefix, removePrefix, addSuffix };
};

export default usePrefix;
