import { FeatureCardProps } from '@/types/types';



export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex items-center text-amber-700">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-slate-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
