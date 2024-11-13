import React, { PropsWithChildren } from 'react'
import styles from '@/app/products/[id]/components/product-detail/product-detail-template/ProductDetailTemplate.module.scss'

export interface ProductDetailTemplateProps {
  titleText: string
  children: React.ReactNode
}

/**
 * ProductDetailTemplate - 제품 상세 정보와 리뷰 섹션을 위한 템플릿 컴포넌트
 * @param titleText 섹션의 제목 텍스트
 * @param children 세부 자식 컴포넌트
 */
function ProductDetailTemplate({
  titleText,
  children,
  ...props
}: ProductDetailTemplateProps) {
  return (
    <section className={styles.productDetailInfoSection}>
      <div className={styles.productDetailInfoWrapper}>
        <div className={styles.productDetailInfoTitle}>{titleText}</div>
        {children}
      </div>
    </section>
  )
}

export default ProductDetailTemplate
