import React from 'react'
import { Review } from './ProductsDetailReview'
import { RatingStars } from '@/components/rating-stars'

export interface ProductReviewItemProps {
  review: Review
  styles: { [key: string]: string }
}

function ProductReviewItem({
  review,
  styles,
  ...props
}: ProductReviewItemProps) {
  const { rating, reviewerName, date, comment } = review

  // =============함수 선언=================
  //1. 이름 마크업 함수
  const markWriterName = (name: string) => {
    if (name.length >= 3) {
      return name.replace(/(?<=.{3})[^ ]/gi, '*')
    } else {
      return name.replace(/(?<=.{1})[^ ]/gi, '*')
    }
  }

  // 2. 날짜 커스텀
  const customDate = (date: string) => {
    const dateOnly = date.replace(/T.*$/, '').split('-') // T 이후 삭제
    return `${dateOnly[0]}년 ${dateOnly[1]}월 ${dateOnly[2]}일`
  }

  return (
    <li className={styles.reviewItemWrapper}>
      {/* 상단 별점&작성자&날짜 */}
      <div className={styles.reviewItemWriterInfoWrapper}>
        {/* 별 & 작성자 wrapper */}
        <div className={styles.reviewItemWriter}>
          {/* stars */}
          <RatingStars rating={rating} />
          {/* 작성자 */}
          <p>{markWriterName(reviewerName)}</p>
        </div>
        {/* 날짜 */}
        <p className={styles.reviewItemWriterDate}>{customDate(date)}</p>
      </div>
      {/* 리뷰 내용 */}
      <div className={styles.reviewComment}>{comment}</div>
    </li>
  )
}

export default ProductReviewItem
