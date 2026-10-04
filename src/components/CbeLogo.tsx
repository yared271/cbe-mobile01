import React from 'react';

interface CbeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customUrl?: string;
  isDarkBg?: boolean;
  onClick?: () => void;
}

export const CbeLogo: React.FC<CbeLogoProps> = ({
  className = '',
  size = 'md',
  customUrl,
  isDarkBg = false,
  onClick,
}) => {
  // If on dark background (e.g. ATM Card on Home screen), default is the official white logo!
  // If on light background, default is the 3D Gold or official colored logo
  const defaultLogo = isDarkBg ? '/cbe_white_logo.png' : '/cbe_gold_logo.jpg';

  const activeUrl =
    customUrl ||
    (isDarkBg
      ? localStorage.getItem('cbe_home_logo_url') || '/cbe_white_logo.png'
      : localStorage.getItem('cbe_custom_logo_url') || defaultLogo);

  const sizeClass = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center shrink-0 select-none ${sizeClass} ${className} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      }`}
    >
      <img
        src={activeUrl}
        alt="Commercial Bank of Ethiopia Official Logo"
        className="w-full h-full object-contain filter drop-shadow-xs"
        style={{ backgroundColor: 'transparent' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = defaultLogo;
        }}
      />
    </div>
  );
};
