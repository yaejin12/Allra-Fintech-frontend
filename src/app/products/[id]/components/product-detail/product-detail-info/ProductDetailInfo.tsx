import React from 'react'
import styles from '@/app/products/[id]/components/product-detail/product-detail-info/ProductDetailInfo.module.scss'
import ProductDetailTemplate from '../product-detail-template/ProductDetailTemplate'

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
  ...props
}: ProductDetailInfoProps) {
  const { width, height, depth } = dataSize
  return (
    <ProductDetailTemplate titleText={'Info'}>
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
      <table className={styles.sizeTable}>
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
    </ProductDetailTemplate>
  )
}

export default ProductDetailInfo
