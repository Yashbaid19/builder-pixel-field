import { useState } from "react";
import { AlertTriangle, X, Wifi, WifiOff } from "lucide-react";

interface DemoModeIndicatorProps {
  isDemoMode: boolean;
}

export function DemoModeIndicator({ isDemoMode }: DemoModeIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isDemoMode || !isVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-yellow-900 px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WifiOff className="w-5 h-5" />
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">
            Demo Mode: Backend server not available - using offline demo data
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-yellow-900 hover:text-yellow-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
