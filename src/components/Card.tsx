import React from 'react';
import { DashboardCard as DashboardCardType } from '../types';
import '../styles/Card.css';

interface CardProps {
  card: DashboardCardType;
  index: number;
  onPin?: (card: DashboardCardType) => void;
  isPinned?: boolean;   
}

const Card: React.FC<CardProps> = ({ 
  card, 
  index,
  onPin,
  isPinned 
}) => {
  // Determine card state based on payload type
  const isAlert = card.payload.type === 'alert';
  const cardState = card.state || (isAlert ? 'error' : 'active');

  // Calculate confidence level
  const confidenceScore = card.meta.confidence_score;
  const confidencePercent = Math.round(confidenceScore * 100);
  
  let confidenceLevel: 'low' | 'medium' | 'high';
  if (confidencePercent < 40) {
    confidenceLevel = 'low';
  } else if (confidencePercent <= 80) {
    confidenceLevel = 'medium';
  } else {
    confidenceLevel = 'high';
  }

  // Determine source tags from payload.sources
  const getSourceType = (filename: string): 'pdf' | 'web' | 'sql' | null => {
    const lower = filename.toLowerCase();
    if (lower.endsWith('.pdf')) return 'pdf';
    if (lower.endsWith('.xlsx') || lower.endsWith('.xls') || lower.endsWith('.csv')) return 'sql';
    if (lower.includes('http') || lower.includes('www') || lower.endsWith('.html')) return 'web';
    return null;
  };

  const handlePin = (): void => {
    if (onPin && cardState === 'active') {
      onPin(card);
    }
  };

  const sourceTags: Array<'pdf' | 'web' | 'sql'> = [];
  if (card.payload.sources && card.payload.sources.length > 0) {
    const uniqueSources = new Set<'pdf' | 'web' | 'sql'>();
    card.payload.sources.forEach(source => {
      const type = getSourceType(source);
      if (type) uniqueSources.add(type);
    });
    sourceTags.push(...Array.from(uniqueSources));
  }

  if (cardState === 'error') {
    return (
      <div
        className="dashboard-card error"
        style={{ animationDelay: `${index * 0.05}s` }}
        onClick={handlePin}
      >
        {!isPinned && (
          <div className="pin-indicator">📌</div>
        )}
        {isPinned && (
          <div className="pinned-indicator">✓</div>
        )}
        
        <div className="card-header">
          <h3 className="card-title">ALERT</h3>
          {card.payload.severity && (
            <span className="type-badge" style={{ 
              background: 'rgba(244, 67, 54, 0.15)', 
              color: '#F97066' 
            }}>
              {card.payload.severity}
            </span>
          )}
        </div>
        <div className="card-body">
          <p className="error-note">{card.payload.content}</p>
        </div>
        <div className="card-footer">
          <div className="error-actions">
            <button className="error-button retry-button">
              Retry
            </button>
            <button className="error-button details-button">
              Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render inactive state
  if (cardState === 'inactive') {
    return (
      <div
        className="dashboard-card inactive"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
      </div>
    );
  }

  // Render active/normal state
  return (
    <div
      className={`dashboard-card ${isPinned ? 'pinned' : ''}`}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={handlePin} 
    >
      {!isPinned && (
        <div className="pin-indicator">📌</div>
      )}
      {isPinned && (
        <div className="pinned-indicator">📌</div>
      )}

      <div className="card-header">
        <span className="card-title">{card.payload.type.replace('_', ' ')}</span>
        <div className="source-tags">
          {sourceTags.map((sourceType, idx) => (
            <span key={idx} className={`source-tag ${sourceType}`}>
              {sourceType}
            </span>
          ))}
        </div>
      </div>

      {/* Body: Confidence */}
      <div className="card-body">
        <div className="confidence-section">
          <div className="confidence-header">
            <span className="confidence-label">Confidence</span>
            <span className="confidence-value">{confidencePercent}%</span>
          </div>
          <div className="confidence-bar-wrapper">
            <div 
              className={`confidence-bar-fill ${confidenceLevel}`}
              style={{ width: `calc(${confidencePercent}% - 2px)` }}
            />
            <div className="confidence-bar-empty" />
          </div>
        </div>
      </div>

      {/* Footer: Insight Content */}
      <div className="card-footer">
        <p className="insight-content">{card.payload.content}</p>
      </div>
    </div>
  );
};

export default Card;