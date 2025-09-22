import Banner from "@/components/layout/home/banner";
import SocialButtons from "@/components/layout/home/SocialButtons";
import ActionButtons from "@/components/layout/home/ActionButtons";
import ReviewUs from "@/components/layout/home/ReviewUs";
import ProductCatalogue from "@/components/layout/home/ProductCatalogue";
import ContactCard from "@/components/layout/home/ContactCard";
import TopSellingProducts from "@/components/layout/home/TopSellingProducts";
import FixedShareButton from "@/components/layout/home/FixedShareButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      
      {/* Add spacing after banner to account for absolute positioning */}
      <div className="pt-20">
        <SocialButtons />
        <ActionButtons />
        <ReviewUs />
        <ProductCatalogue />
        <ContactCard />
        <TopSellingProducts />
      </div>
      
      <FixedShareButton />
    </div>
  );
}
