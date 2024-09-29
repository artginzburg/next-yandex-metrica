import Image from 'next/image';
import { FC } from 'react';

interface MetricaPixelProps {
  tagID: number;
}

/** @todo shouldUseAlternativeCDN */
export const MetricaPixel: FC<MetricaPixelProps> = ({ tagID }) => (
  <div>
    <Image
      height="1"
      width="1"
      style={{ display: 'none', position: 'absolute', left: -9999 }}
      src={`https://mc.yandex.ru/watch/${tagID}`}
      alt=""
      unoptimized
    />
  </div>
);
