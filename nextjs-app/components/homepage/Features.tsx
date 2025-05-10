import { Feature } from "@/sanity.types";
import FeatureCard from "./FeaturesCard";

// Fallback features in case no content is provided from Sanity
const fallbackFeatures = [
  {
    feature_icon: { name: "lucide:truck" },
    feature_title: "Free Shipping",
    feature_description:
      "Free shipping on all orders over $100. Fast delivery across the US.",
  },
  {
    feature_icon: { name: "lucide:shield-check" },
    feature_title: "Secure Payment",
    feature_description:
      "All transactions are secured with SSL encryption for your peace of mind.",
  },
  {
    feature_icon: { name: "lucide:refresh-cw" },
    feature_title: "Easy Returns",
    feature_description:
      "30-day hassle-free return policy. No questions asked.",
  },
  {
    feature_icon: { name: "lucide:headphones" },
    feature_title: "24/7 Support",
    feature_description:
      "Our customer service team is available around the clock to assist you.",
  },
];

export default function FeaturesListing({ content }: { content?: Feature[] }) {
  // Use fallback features if no content is provided
  const featuresToDisplay =
    content && content.length > 0 ? content : fallbackFeatures;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Shop With Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re committed to providing the best shopping experience with
            these amazing benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresToDisplay.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
