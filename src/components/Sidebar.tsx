import React from 'react';
import { SidebarItem as SidebarItemType } from '../types';
import { FiSun, FiMoon, FiCodesandbox } from 'react-icons/fi';
import '../styles/Sidebar.css';
import PinnedItems from './PinnedItems';
import { PinnedItem } from '../types';

interface SidebarProps {
  items: SidebarItemType[];
  activeNav: string;
  onNavChange: (id: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  showHighConfidenceOnly: boolean;
  onConfidenceToggle: () => void;
  pinnedItems: PinnedItem[];
  onUnpinItem: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeNav,
  onNavChange,
  isDarkMode,
  onThemeToggle,
  showHighConfidenceOnly,
  onConfidenceToggle,
  pinnedItems,
  onUnpinItem, 
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">
            <FiCodesandbox />
          </span>
          <span className="logo-text">AI Insights</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
            onClick={() => onNavChange(item.id)}
          >
            <span className="nav-icon">
              {(() => {
                return React.createElement(item.icon);
              })()}
            </span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <PinnedItems items={pinnedItems} onUnpin={onUnpinItem} />
      
      <div className="toggle-item">
        <span className="toggle-label">High Confidence (&gt;80%)</span>
        <button 
          className={`toggle-switch ${showHighConfidenceOnly ? 'active' : ''}`}
          onClick={onConfidenceToggle}
          aria-label="Toggle high confidence filter"
        >
          <span className="toggle-slider"></span>
        </button>
      </div>
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={onThemeToggle}>
          <span className="toggle-icon">{isDarkMode ? <FiSun /> : <FiMoon />}</span>
          <span className="toggle-label">{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
