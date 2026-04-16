import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc = "https://picsum.photos/seed/placeholder/800/600",
  className,
  alt,
  loading = "lazy",
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      onError={handleError}
      className={className}
      alt={alt}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};
