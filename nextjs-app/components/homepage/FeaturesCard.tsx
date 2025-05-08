import { Features } from "@/sanity.types";
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  feature_icon: LucideIcon;
  feature_title: string;
  feature_description: string;
};

export default function FeatureCard(props: Features) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="p-4 bg-indigo-100 rounded-full mb-4">
        {/* < className="h-6 w-6 text-indigo-600" /> */}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{props.feature_title}</h3>
      <p className="text-gray-600">{props.feature_description}</p>
    </div>
  );
}
