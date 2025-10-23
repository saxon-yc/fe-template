/* *** 所有表列 *** */
import type { ColumnsType } from 'antd/es/table'

export const TRAIN_DATASETS_COLUMNS: ColumnsType<any> = [
  {
    title: '场景名称',
    dataIndex: 'task_name',
    key: 'task_name',
    width: 140,
    fixed: 'left',
  },
  {
    title: '数据集',
    dataIndex: 'dataset_name',
    key: 'dataset_name',
    width: 140,
  },
  {
    title: '开始时间',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 220,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
  {
    title: '进度',
    dataIndex: 'progress',
    key: 'progress',
    width: 100,
  },
  {
    title: '操作',
    key: 'operator',
    fixed: 'right',
    width: 140,
  },
]
