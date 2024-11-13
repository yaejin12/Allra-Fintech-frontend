import React, { PropsWithChildren } from 'react'
import styles from '@/app/products/[id]/components/product-detail/product-detail-template/ProductDetailTemplate.module.scss'

export interface ProductDetailTemplateProps {
  titleText: string
  children: React.ReactNode
}

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
