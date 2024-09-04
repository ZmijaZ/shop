export interface Product {
    id: string
    name: string
    priceInCents: number
    filePath: string
    imagePath: string
    description: string
    isAvailableForPurchase: boolean
    createdAt: string
    updatedAt: string
}

export type NewProduct = Omit<Product, 'id' | 'filePath' | 'imagePath' | 'createdAt' | 'updatedAt'>