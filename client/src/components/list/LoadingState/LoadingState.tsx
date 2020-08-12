import React, { useState, useEffect } from 'react';
import { Container } from './LoadingStateStyles';
import Skeleton from 'react-loading-skeleton';

const LoadingState = () => {
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(true);
    }, [250]);

    return () => clearTimeout(timer);
  }, []);

  if (showSkeleton) {
    return (
      <Container>
        <div style={{ marginBottom: '2rem' }}>
          <Skeleton width={`50%`} height={50} />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <Skeleton count={3} />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <Skeleton width={100} height={25} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Skeleton height={80} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Skeleton height={80} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Skeleton height={80} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Skeleton height={80} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Skeleton height={80} />
        </div>
      </Container>
    );
  } else {
    return <Container></Container>;
  }
};

export default LoadingState;
