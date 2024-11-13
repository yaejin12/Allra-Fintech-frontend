'use client'

import { Suspense, use } from 'react'
import { useProduct } from '@/app/products/[id]/hooks/use-product'
import ProductDetailTop from './components/product-detail/product-detail-top/ProductDetailTop'
import { log } from 'console'
import '@/assets/css/common.css'
import ProductDetailInfo from './components/product-detail/product-detail-info/ProductDetailInfo'

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)

  const { data, isLoading, error } = useProduct(id)
  console.log(data)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    throw new Error(error.message)
  }

  // 상세페이지 랜더링하는 부분
  return (
    <Suspense>
      <ProductDetailTop data={data!} />
      <ProductDetailInfo
        dataImg={data!.images}
        dataSize={data!.dimensions}
        dataWeight={data!.weight}
        dataTitle={data!.title}
      />
    </Suspense>
  )
}
