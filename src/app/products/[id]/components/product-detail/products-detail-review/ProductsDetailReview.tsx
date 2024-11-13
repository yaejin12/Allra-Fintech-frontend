import React from 'react'
import ProductDetailTemplate from '../product-detail-template/ProductDetailTemplate'
import styles from '@/app/products/[id]/components/product-detail/products-detail-review/ProductsDetailReview.module.scss'
import ProductReviewItem from './ProductReviewItem'

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}
export interface ProductsDetailReviewProps {
  reviewData: Review[]
}

function ProductsDetailReview({ reviewData }: ProductsDetailReviewProps) {
  return (
    <ProductDetailTemplate titleText={`Review(${reviewData.length})`}>
      <ul className={styles.reviewWrapper}>
        {/* 각각의 리뷰 */}
        {reviewData.map((review, index) => {
          return (
            <ProductReviewItem key={index} styles={styles} review={review!} />
          )
        })}
      </ul>
    </ProductDetailTemplate>
  )
}

export default ProductsDetailReview
