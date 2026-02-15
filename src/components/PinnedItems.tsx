import React from 'react';
import { PinnedItem } from '../types';
import '../styles/PinnedItems.css';

interface PinnedItemsProps {
  items: PinnedItem[];
  onUnpin: (id: string) => void;
}

const PinnedItems: React.FC<PinnedItemsProps> = ({ items, onUnpin }) => {
  const getConfidenceLevel = (score: number): 'low' | 'medium' | 'high' => {
    const percent = score * 100;
    if (percent < 40) return 'low';
    if (percent <= 80) return 'medium';
    return 'high';
  };

  const getConfidenceColor = (level: 'low' | 'medium' | 'high'): string => {
    switch (level) {
      case 'low': return '#f44336';
      case 'medium': return '#ff9800';
      case 'high': return '#4caf50';
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="pinned-section">
      <div className="pinned-header">
        <span className="pinned-title">Pinned</span>
        <span className="pinned-count">{items.length}</span>
      </div>
      <div className="pinned-list">
        {items.map((item) => {
          const level = getConfidenceLevel(item.confidenceScore);
          const color = getConfidenceColor(level);
          const percent = Math.round(item.confidenceScore * 100);

          return (
            <div key={item.id} className="pinned-item">
              <div className="pinned-item-content">
                <span className="pinned-item-title">{item.title}</span>
                <span 
                  className="pinned-item-confidence"
                  style={{ color }}
                >
                  {percent}%
                </span>
              </div>
              <button
                className="pinned-item-remove"
                onClick={() => onUnpin(item.id)}
                aria-label="Unpin item"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PinnedItems;