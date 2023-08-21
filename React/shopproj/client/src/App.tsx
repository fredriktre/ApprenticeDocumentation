// import { useEffect } from "react"
import Navigation from "./components/Navigation";
import {
  Route,
  Routes
} from 'react-router-dom'
import Home from "./pages/Home";

export type ProductImage = {
  is_default : boolean,
  is_selected_for_publishing: boolean,
  position: string,
  src: string,
  variant_ids: Array<number>
}

export type ProductOption = {
  name: string,
  type: string,
  values: Array<any>
}

export type ProductVariant = {
  cost: number,
  grams:number,
  id: number,
  is_available: boolean,
  is_default: boolean,
  is_printify_express_eligible: boolean,
  options: Array<number>,
  price: number,
  quantity: number,
  sku: string,
  title: string,
}

export type ProductInformation = {
  blueprint_id: number,
  created_at: string,
  description: string,
  id: string,
  images: Array<ProductImage>,
  is_locked: boolean,
  is_printify_express_eligible: boolean,
  options: Array<ProductOption>,
  print_areas: Array<any>,
  print_details: Array<any>,
  print_provider_id: number,
  sales_channel_properties: Array<any>,
  shop_id: number,
  tags: Array<string>,
  title: string,
  twodaydelivery_enabled: boolean,
  updated_at: string,
  user_id: number,
  variants: Array<ProductVariant>,
  visible: boolean,
}

const App = () => {
  
  return (
    <div className="relative min-h-screen h-full">
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>



    </div>
  )
}

export default App