import React from 'react'
import styles from '@/app/products/[id]/components/product-detail/product-detail-info/ProductDetailInfo.module.scss'
import ProductDetailTemplate from '../product-detail-template/ProductDetailTemplate'

export interface ProductDetailInfoProps {
  dataImg: string[]
  dataSize: { width: number; height: number; depth: number }
  dataWeight: number
  dataTitle: string
}
/**
 * ProductDetailInfo - 제품의 상세 정보 섹션을 구성하는 컴포넌트
 * 이 컴포넌트는 제품 이미지와 제품 크기(가로, 세로, 깊이, 무게)를 표 형식으로 보여준다
 */
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
              <img src={image} alt={dataTitle} loading="lazy" />
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
