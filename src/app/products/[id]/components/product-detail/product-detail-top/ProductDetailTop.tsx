import React, { useEffect } from 'react'
import styles from '@/app/products/[id]/components/product-detail/product-detail-top/ProductDetailTop.module.scss'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/rating-stars'
import { ProductDetail } from '@/schemas/product'
import DetailButton from '@/components/ui/DetailButton'

export interface ProductDetailTopProps {
  data: ProductDetail
}

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
    availabilityStatus,
  } = data

  // 제품의 재고 버그 수정
  const calculateAvailability = () => {
    return minimumOrderQuantity <= stock ? 'primary' : 'disabled'
  }

  return (
    <section className={styles.productDetailTopSection}>
      <div className={styles.productDetailTopWrapper}>
        {/* 오른쪽 이미지 */}
        <div className={styles.productMainImgWrapper}>
          <img src={images[0]} alt={title} />
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
                {Array(15)
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
