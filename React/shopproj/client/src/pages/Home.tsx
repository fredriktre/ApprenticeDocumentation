import CategorySlider from "../components/CategorySlider"
import ProductCard from "../components/ProductCard"

const Home = () => {
  return (
    <div className="w-full h-full min-h-screen-16">
        <div className="w-full min-h-screen-16 flex justify-center items-center">
            <div className="relative w-4/5 h-96 rounded-lg overflow-hidden">
                <div className="relative z-30 w-full h-full gap-2 flex flex-col justify-center items-center text-white">
                    <h1 className="text-4xl m-2">For you and all</h1>
                    <p className="text-xl">Here you can find items for you, your friends, your parents, and so many more!</p>
                    <p className="text-xl">Explore and see what you find!</p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <span className="absolute z-20 top-0 left-0 w-full h-full bg-black opacity-60"></span>
                    <img className="absolute z-10 top-0 left-0 w-full h-full" src="/olsps.jpg" />
                </div>
            </div>
        </div>
        <div className="w-full h-screen">
            <div className="w-4/5 mx-auto h-full flex flex-col gap-5">
                <CategorySlider>
                    <ProductCard />
                </CategorySlider>
            </div>
        </div>
    </div>
  )
}

export default Home