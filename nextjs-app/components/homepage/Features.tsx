import { Features } from "@/sanity.types";
import { Clock, RefreshCw, Shield, Truck } from "lucide-react";
import FeatureCard from "./FeaturesCard";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30 days return policy",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated support team",
  },
];

export default function FeaturesListing({ content }: { content?: Features[] }) {
  if (!content) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content?.map((feature, index) => (
            <FeatureCard key={feature.feature_title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
