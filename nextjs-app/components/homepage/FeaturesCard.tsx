import { Feature } from "@/sanity.types";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  feature_icon?: any;
  feature_title: string;
  feature_description?: string;
  index?: number;
};

export default function FeatureCard(props: FeatureCardProps) {
  // Define a set of background colors for the icon containers
  const bgColors = [
    "bg-indigo-100 text-indigo-600",
    "bg-amber-100 text-amber-600",
    "bg-emerald-100 text-emerald-600",
    "bg-rose-100 text-rose-600",
  ];

  const bgColorClass =
    props.index !== undefined
      ? bgColors[props.index % bgColors.length]
      : bgColors[0];

  return (
    <div className="group p-6 rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-md hover:border-gray-300 flex flex-col items-center text-center">
      <div
        className={cn(
          "p-4 rounded-full mb-5 transition-transform duration-300 group-hover:scale-110",
          bgColorClass
        )}
      >
        {props.feature_icon?.name && (
          <Icon
            icon={props.feature_icon.name}
            className="h-8 w-8"
            aria-hidden="true"
          />
        )}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">
        {props.feature_title}
      </h3>
      <p className="text-gray-600">{props.feature_description || ""}</p>
    </div>
  );
}
