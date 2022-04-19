import React, { Suspense } from 'react';
import PreloaderImg from '../components/common/Preloader/PreloaderImg';

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <Suspense fallback={<PreloaderImg />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}
