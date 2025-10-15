import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GlassCardProps {
  title?: string;
  icon?: React.ElementType;
  gradient?: string;
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({
  title,
  icon: Icon,
  gradient = "from-blue-600 to-purple-600",
  children,
  className,
}: GlassCardProps) {
  return (
    <div className={`relative group ${className || ""}`}>
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`}
      ></div>
      <Card className="relative bg-black/70 backdrop-blur-lg border border-white/10 h-full">
        {title && (
          <CardHeader>
            <CardTitle className="text-gray-200 text-base flex items-center gap-2">
              {Icon && <Icon className="w-5 h-5 text-gray-300" />}
              {title}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
