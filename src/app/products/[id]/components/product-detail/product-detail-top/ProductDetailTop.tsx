import React, { useEffect } from 'react'
import styles from '@/app/products/[id]/components/product-detail/product-detail-top/ProductDetailTop.module.scss'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/rating-stars'
import { ProductDetail } from '@/schemas/product'
import DetailButton from '@/components/ui/DetailButton'

export interface ProductDetailTopProps {
  data: ProductDetail
}

/**
 * ProductDetailTop - 제품의 상단 상세 정보를 표시하는 컴포넌트
 */
function ProductDetailTop({ data }: ProductDetailTopProps) {
  const {
    rating,
    price,
    title,
    brand,
    category,
    tags,
    images,
    discountPercentage,
    description,
    shippingInformation,
    warrantyInformation,
    stock,
    minimumOrderQuantity,
  } = data

  /**
   * 재고 상태에 따라 버튼 활성화 여부를 결정
   * 최소 주문 수량이 현재 재고보다 적거나 같을 때 'primary',
   * 그렇지 않을 경우 'disabled' 상태를 반환
   */
  const calculateAvailability = () => {
    return minimumOrderQuantity <= stock ? 'primary' : 'disabled'
  }

  /**
   * 재고가 최소 주문 수량 이상일 경우 선택 가능한 최대 수량을 계산,
   * 그렇지 않으면 최소 주문 수량을 반환
   */
  const calculateSelectQuantity = () => {
    if (stock - minimumOrderQuantity >= 0) {
      return stock - minimumOrderQuantity + 1
    } else {
      return 1
    }
  }

  return (
    <section className={styles.productDetailTopSection}>
      <div className={styles.productDetailTopWrapper}>
        {/* 오른쪽 이미지 */}
        <div className={styles.productMainImgWrapper}>
          <img src={images[0]} alt={title} loading="lazy" decoding="async" />
        </div>
        {/* 왼쪽 정보 */}
        <div className={styles.productTopInfoWrapper}>
          {/* 왼쪽 정보 -상단 */}
          <div className={styles.productInfoHeader}>
            {/* tags */}
            <div className={styles.productTags}>
              {tags.map((tag) => {
                return (
                  <div key={tag} className={styles.tag}>
                    <Badge>{tag}</Badge>
                  </div>
                )
              })}
            </div>

            {/* brand & category */}
            <div className={styles.brandAndCategory}>
              {/* brand 없는 제품도 있어서 && 연산자로 작업함 */}
              {brand && <p>{brand}</p>}
              <p>{category}</p>
            </div>
            {/* title */}
            <p className={styles.productName}>{title}</p>

            {/* stars */}
            <RatingStars rating={rating} />

            {/* price */}
            <div className={styles.priceWrapper}>
              <p className={styles.price}>{price}$</p>
              <p className={styles.sale}>{discountPercentage}% sale</p>
            </div>

            {/* description */}
            <div className={styles.description}>
              <p>{description}</p>
            </div>
          </div>
          {/* 왼쪽 정보 -하단 */}
          <div className={styles.productInfoBottom}>
            {/* shippingInformation */}
            <ul>
              <li>
                <span>shippingInformation</span>
                {shippingInformation}
              </li>
              <li>
                <span>warrantyInformation</span>
                {warrantyInformation}
              </li>
              <li>Only {stock} remains</li>
            </ul>
            {/* Button */}
            <div className={styles.addToCartButton}>
              <select name="num">
                {Array(calculateSelectQuantity())
                  .fill(0)
                  .map((_, i) => {
                    return (
                      <option
                        key={minimumOrderQuantity + i}
                        value={minimumOrderQuantity + i}
                      >
                        {minimumOrderQuantity + i}
                      </option>
                    )
                  })}
              </select>
              <DetailButton
                text={'Add to Cart'}
                cssType={calculateAvailability()}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailTop
