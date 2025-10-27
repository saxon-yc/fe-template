import { Button, Image, Result } from 'antd'
import { useNavigate } from '@tanstack/react-router'

interface ExceptionProps {
  src: string
}
export default function Exception({ src }: ExceptionProps) {
  const navigate = useNavigate()

  const handleBackHome = () => {
    navigate({ to: '/' })
  }

  return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <Result
        // icon={<SvgIcon localIcon='not-found' className='w-[400px] h-[400px]' />}
        icon={<Image src={src} width={400} height={400} preview={false} />}
        extra={[
          <Button type='primary' onClick={handleBackHome} key='home'>
            返回首页
          </Button>,
        ]}
      />
    </div>
  )
}
