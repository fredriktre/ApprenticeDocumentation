export type Product = {
    blueprint_id: number,
    created_at: string,
    description: string,
    id: string,
    images: Array<ProductImage>,
    is_locked: boolean,
    is_printify_express_eligible: boolean,
    options: Array<ProductOptions>,
    print_areas: Array<ProductPrintAreas>,
    print_details: Array<any>,
    print_provider_id: number,
    sales_channel_properties: Array<any>,
    shop_id: number,
    tags: Array<string>,
    title: string,
    updated_at: string,
    user_id: number,
    variants: Array<ProductVariant>,
    visible: boolean,
}

export type ProductImage = {
    is_default: boolean,
    is_selected_for_publishing: boolean,
    position: string,
    src: string,
    variant_ids: Array<number>
}

export type ProductOptions = {
    name: string,
    type: string,
    values: Array<any>
}

export type ProductPrintAreas = {
    background?: string,
    placeholders: Array<ProductPrintAreasPlaceholder>
    variant_ids: Array<number>
}

export type ProductPrintAreasPlaceholder = {
    position: string,
    images: Array<ProductPrintAreasPlaceholderImage>
}

export type ProductPrintAreasPlaceholderImage = {
    angle: number,
    height: number,
    id: string,
    name: string,
    scale: number,
    type: string,
    width: number,
    x: number,
    y: number
}

export type ProductVariant = {
    cost: number,
    grams: number,
    id: number,
    is_available: boolean,
    is_default: boolean,
    is_enabled: boolean,
    is_printify_express_eligible: boolean,
    options: Array<number>,
    price: number,
    quantity: number,
    sku: string,
    title: string,
}