import { z } from 'zod'

// 개별 제품의 속성을 정의하는 스키마
export const productListItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  discountPercentage: z.number(),
  thumbnail: z.string().url(),
})
// `productListItemSchema`의 타입을 생성하여 TypeScript에서 사용하도록 정의
export type ProductListItem = z.infer<typeof productListItemSchema>

// 여러 제품과 추가 정보를 포함하는 응답의 구조를 정의
export const getProductsResponseSchema = z.object({
  products: z.array(productListItemSchema), // 제품 목록 (productListItemSchema 배열)
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

// `getProductsResponseSchema`의 타입을 생성하여 TypeScript에서 사용하도록 정의
export type GetProductsResponse = z.infer<typeof getProductsResponseSchema>

// 제품 크기(치수)를 정의하는 스키마
const dimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
})

// 제품 리뷰 정보를 정의하는 스키마
const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
  reviewerEmail: z.string(),
})

// 개별 제품의 상세 정보를 정의하는 스키마
export const productDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string().optional(),
  sku: z.string(),
  weight: z.number(),
  dimensions: dimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(reviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  images: z.array(z.string()),
  thumbnail: z.string(),
})

// `productDetailSchema`의 타입을 생성하여 TypeScript에서 사용하도록 정의
export type ProductDetail = z.infer<typeof productDetailSchema>
