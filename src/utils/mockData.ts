import { DashboardCard, SidebarItem } from '../types';
import { FiHome, FiBarChart2, FiFileText, FiSettings } from 'react-icons/fi';

export const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome, active: true },
  { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
  { id: 'reports', label: 'Reports', icon: FiFileText },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

export const cardData: DashboardCard[] = [
  {
    id: "uuid-1234",
    meta: {
      generated_at: "2024-02-14T10:00:00Z",
      model_version: "v2.1",
      confidence_score: 0.89
    },
    payload: {
      type: "text_summary",
      content: "Sales increased by 15% due to new marketing channels.",
      sources: ["campaign_report.pdf", "q3_financials.xlsx"]
    },
    status: "completed"
  },
  {
    id: "uuid-5678",
    meta: {
      confidence_score: 0.45
    },
    payload: {
      type: "alert",
      severity: "high",
      content: "Anomaly detected in server logs."
    },
    status: "processing"
  },
];

// Simulate API call with delay
export const fetchCardData = (): Promise<DashboardCard[]> => {
  return new Promise((resolve) => {
    // Simulate network delay (500ms-1500ms)
    const delay = Math.random() * 1000 + 500;
    
    setTimeout(() => {
      resolve(cardData);
    }, delay);
  });
};