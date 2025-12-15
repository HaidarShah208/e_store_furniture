import { FeatureCardProps } from '@/types/types';



export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex items-center text-primary1">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-semi-bold text-primary1  text-lg">{title}</h3>
        <p className="text-sm font-semi-bold text-deep_walnut leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
