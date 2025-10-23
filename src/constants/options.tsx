import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons'

// 数据集状态
export const DATA_STATUS_OPTIONS = [
  {
    label: '未开始预处理',
    value: '0',
    color: 'default',
    icon: <ClockCircleOutlined />,
  },
  {
    label: '预处理完成',
    value: '1',
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  {
    label: 'AI处理中',
    value: '2',
    color: 'processing',
    icon: <LoadingOutlined />,
  },
  {
    label: '预处理失败',
    value: '3',
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
]
