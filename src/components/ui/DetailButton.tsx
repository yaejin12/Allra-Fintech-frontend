import React from 'react'
import styles from '@/components/ui/DetailButtonProps.module.scss'

export type DetailButtonProps = {
  text: string
  cssType: 'disabled' | 'primary'
}
/**
 *
 * @param text: 버튼 내용
 * @param cssType: "disabled" 비활성화 "primary" 활성화
 * @returns
 */
function DetailButton({ text, cssType, ...props }: DetailButtonProps) {
  return (
    <button
      className={`${styles.button} ${cssType === 'disabled' ? styles.disabled : ''}`}
      disabled={cssType === 'disabled'}
    >
      {cssType === 'disabled' ? 'Low Stock' : text}
    </button>
  )
}

export default DetailButton
