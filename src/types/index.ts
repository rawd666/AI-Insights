export interface DashboardCard {
  id: string;
  meta: {
    generated_at?: string;
    model_version?: string;
    confidence_score: number;
  };
  payload: {
    type: string;
    content: string;
    sources?: string[];
    severity?: string;
  };
  status: string;
  source?: 'pdf' | 'web' | 'sql';
  state?: 'active' | 'inactive' | 'error';
  errorMessage?: string;
  errorDetails?: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType; 
  active?: boolean;
}

export interface PinnedItem {
  id: string;
  title: string;
  confidenceScore: number;
  pinnedAt: number;
}