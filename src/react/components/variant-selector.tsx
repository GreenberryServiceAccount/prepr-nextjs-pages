import React from 'react';
import { useVariantContext } from '../contexts';
import { useRouter } from 'next/router.js';
import RadioSelector from './radio-selector';

export default function VariantSelector() {
  const { selectedVariant, setSelectedVariant, emptyVariant } =
    useVariantContext();

  const router = useRouter();

  const updateSelectedVariant = (value: string | boolean) => {
    const params = new URLSearchParams(window.location.search);
    setSelectedVariant(String(value));
    params.set('prepr_preview_ab', String(value));

    router.push(`${router.asPath.split('?')[0]}?${params.toString()}`);
  };

  const options = [
    { value: 'null', label: 'Off', width: 'p-w-[58px]' },
    { value: 'A', label: 'A', width: 'p-w-[82px]' },
    { value: 'B', label: 'B', width: 'p-w-[82px]' },
  ];

  return (
    <RadioSelector
      value={selectedVariant || emptyVariant}
      onChange={updateSelectedVariant}
      options={options}
    />
  );
}
