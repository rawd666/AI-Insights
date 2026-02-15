import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import { sidebarItems, fetchCardData } from './utils/mockData';
import { DashboardCard, PinnedItem } from './types';
import './styles/variables.css';
import './styles/Dashboard.css';
import SkeletonCard from './components/SkeletonCard';

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>('dashboard');
  const [cardData, setCardData] = useState<DashboardCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showHighConfidenceOnly, setShowHighConfidenceOnly] = useState<boolean>(false);

  const toggleConfidenceFilter = (): void => {
    setShowHighConfidenceOnly(!showHighConfidenceOnly);
  };

  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  const [pinnedItems, setPinnedItems] = useState<PinnedItem[]>(() => {
    const saved = localStorage.getItem('pinnedItems');
    return saved ? JSON.parse(saved) : [];
  });

  const handleTogglePin = (card: DashboardCard): void => {
  const isPinned = isCardPinned(card.id);
  
  if (isPinned) {
    handleUnpinCard(card.id);
  } else {
    const newPinnedItem: PinnedItem = {
      id: card.id,
      title: card.payload.type.replace('_', ' '),
      confidenceScore: card.meta.confidence_score,
      pinnedAt: Date.now(),
    };
    
    const updatedPinned = [...pinnedItems, newPinnedItem];
    setPinnedItems(updatedPinned);
    localStorage.setItem('pinnedItems', JSON.stringify(updatedPinned));
  }
};

  const handleUnpinCard = (id: string): void => {
    const updatedPinned = pinnedItems.filter(item => item.id !== id);
    setPinnedItems(updatedPinned);
    localStorage.setItem('pinnedItems', JSON.stringify(updatedPinned));
  };

  const isCardPinned = (id: string): boolean => {
    return pinnedItems.some(item => item.id === id);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCardData();
        setCardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Constants for row sizes
  const ROW_1_SIZE = 4;
  const ROW_2_SIZE = 3;
  const ROW_3_SIZE = 3;

  const filteredCardData = showHighConfidenceOnly
    ? cardData.filter(card => card.meta.confidence_score > 0.8)
    : cardData;

  // Row 1: Always inactive (4 empty cards)
  const row1Cards = Array(ROW_1_SIZE).fill(null).map((_, idx) => ({
    id: `empty-row1-${idx}`,
    meta: { confidence_score: 0 },
    payload: { type: '', content: '' },
    status: 'inactive',
    state: 'inactive' as const,
  }));

  // Row 2: Active cards - reads from cardData starting at index 0
  const row2Cards = Array(ROW_2_SIZE).fill(null).map((_, idx) => {
    const card = filteredCardData[idx];
    if (card) {
      return card; // Keep as active (or error if alert type)
    }
    // If no data, create empty inactive card
    return {
      id: `empty-row2-${idx}`,
      meta: { confidence_score: 0 },
      payload: { type: '', content: '' },
      status: 'inactive',
      state: 'inactive' as const,
    };
  });

  // Row 3: Always inactive (3 empty cards)
  const row3Cards = Array(ROW_3_SIZE).fill(null).map((_, idx) => ({
    id: `empty-row3-${idx}`,
    meta: { confidence_score: 0 },
    payload: { type: '', content: '' },
    status: 'inactive',
    state: 'inactive' as const,
  }));

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Sidebar
        items={sidebarItems}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
        showHighConfidenceOnly={showHighConfidenceOnly}
        onConfidenceToggle={toggleConfidenceFilter}
        pinnedItems={pinnedItems}
        onUnpinItem={handleUnpinCard}
      />

      <main className="main-content">
        <div className="dashboard-container">
          {error && (
            <div className="error-banner">
              <p>⚠️ {error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}
          
          {/* Row 1: 4 cards (always inactive) */}
          <div className="dashboard-row-1">
            {row1Cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} onPin={handleTogglePin} isPinned={isCardPinned(card.id)}/>
            ))}
          </div>

          {/* Row 2: 3 cards (data from API) */}
          <div className="dashboard-row-2">
            {isLoading ? (
              // Show skeleton cards while loading
              Array(ROW_2_SIZE).fill(null).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} index={index + ROW_1_SIZE} />
              ))
            ) : (
              // Show actual cards when loaded
              row2Cards.map((card, index) => (
                <Card 
                  key={card.id} 
                  card={card} 
                  index={index + ROW_1_SIZE} 
                  onPin={handleTogglePin}
                  isPinned={isCardPinned(card.id)}
                />
              ))
            )}
          </div>

          {/* Row 3: 3 cards (always inactive) */}
          <div className="dashboard-row-3">
            {row3Cards.map((card, index) => (
              <Card key={card.id} card={card} index={index + ROW_1_SIZE + ROW_2_SIZE} onPin={handleTogglePin} isPinned={isCardPinned(card.id)}/>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;