import React from 'react';
import '../styles/SkeletonCard.css';

interface SkeletonCardProps {
  index: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ index }) => {
  return (
    <div
      className="skeleton-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-tag"></div>
      </div>

      <div className="skeleton-body">
        <div className="skeleton-confidence-label"></div>
        <div className="skeleton-confidence-value"></div>
        <div className="skeleton-bar"></div>
      </div>

      <div className="skeleton-footer">
        <div className="skeleton-text-line"></div>
        <div className="skeleton-text-line short"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;