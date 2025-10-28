import { Avatar, Spin, Typography } from 'antd'
import SvgIcon from './svg-icon'

interface LoadingScreenProps {
  tip?: string
}

export default function LoadingScreen({
  tip = '正在加载...',
}: LoadingScreenProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900'>
      {/* 背景装饰 */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-70'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-70'></div>
      </div>

      <div className='flex flex-col items-center gap-6'>
        <Avatar src='/logo.jpg' size={100} />
        <Spin
          indicator={
            <SvgIcon
              icon='eos-icons:bubble-loading'
              className='!text-[60px] !w-[60px] !h-[60px]'
            />
          }
        />
        <Typography.Link className='!text-[30px] font-bold'>
          {tip}
        </Typography.Link>
      </div>
    </div>
  )
}
