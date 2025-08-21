import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useAppStore } from '../../store/useAppStore'

// 简单的计数器组件用于测试
function Counter() {
  const { count, increment, decrement } = useAppStore()

  return (
    <div>
      <span data-testid='count'>{count}</span>
      <button data-testid='increment' onClick={increment}>
        +
      </button>
      <button data-testid='decrement' onClick={decrement}>
        -
      </button>
    </div>
  )
}

describe('Counter Component', () => {
  it('should render initial count', () => {
    render(<Counter />)
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('should increment count when increment button is clicked', () => {
    render(<Counter />)
    const incrementButton = screen.getByTestId('increment')
    const countElement = screen.getByTestId('count')

    fireEvent.click(incrementButton)
    expect(countElement).toHaveTextContent('1')
  })

  it('should decrement count when decrement button is clicked', () => {
    render(<Counter />)
    const decrementButton = screen.getByTestId('decrement')
    const countElement = screen.getByTestId('count')

    fireEvent.click(decrementButton)
    expect(countElement).toHaveTextContent('-1')
  })
})
