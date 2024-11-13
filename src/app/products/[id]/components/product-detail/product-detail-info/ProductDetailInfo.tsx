import React from 'react'
import styles from '@/app/products/[id]/components/product-detail/product-detail-info/ProductDetailInfo.module.scss'

export interface ProductDetailInfoProps {
  dataImg: string[]
  dataSize: { width: number; height: number; depth: number }
  dataWeight: number
  dataTitle: string
}

function ProductDetailInfo({
  dataImg,
  dataSize,
  dataWeight,
  dataTitle,
}: ProductDetailInfoProps) {
  const { width, height, depth } = dataSize
  return (
    <section className={styles.productDetailInfoSection}>
      <div className={styles.productDetailInfoWrapper}>
        <div className={styles.productDetailInfoTitle}>Info</div>
        {/* 상세 이미지 */}
        <ul className={styles.productImagesWrapper}>
          {dataImg.map((image) => {
            return (
              <li className={styles.detailImage} key={image}>
                <img src={image} alt={dataTitle} />
              </li>
            )
          })}
        </ul>
        <table>
          <thead>
            <tr>
              <th>weight</th>
              <th>width</th>
              <th>height</th>
              <th>depth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{dataWeight}</td>
              <td>{width ? width : '-'}</td>
              <td>{height ? height : '-'}</td>
              <td>{depth ? depth : '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ProductDetailInfo
