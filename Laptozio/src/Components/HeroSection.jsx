import OwlCarousel from 'react-owl-carousel';

const HeroSection = () => {
  return (
    <div className='z-[-1]'>
    
    <OwlCarousel className="owl-theme" items={1} nav = {true} autoplay = {true}>
        <div className="container">
                <img src="https://www.layers.shop/cdn/shop/files/collection_banners_1_1.jpg?v=1693591120&width=1860" alt="" />
        </div>
        <div className="container">
                <img src="https://www.layers.shop/cdn/shop/files/collection_banners_1_1.jpg?v=1693591120&width=1860" alt="" />
        </div>
        <div className="container">
                <img src="https://www.layers.shop/cdn/shop/files/collection_banners_1_1.jpg?v=1693591120&width=1860" alt="" />
        </div>
    </OwlCarousel>
    </div>
  )
}

export default HeroSection
