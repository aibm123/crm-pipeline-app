// API Service - Gọi backend thông qua biến môi trường
// Không chứa logic backend, chỉ gọi API

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface Deal {
  id: number;
  name: string;
  customer: string;
  value: number;
  stage: string;
  owner: string;
  created: string;
}

export interface User {
  id: number;
  mail: string;
  quyen: string;
}

export interface DashboardData {
  deals: Deal[];
  users: User[];
}

export interface AnalysisResult {
  analysis: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getDashboardData(mail: string): Promise<ApiResponse<DashboardData>> {
    return this.request<DashboardData>('/api/dashboard', {
      method: 'POST',
      body: JSON.stringify({ task: 'get_dashboard', mail }),
    });
  }

  async analyzeData(prompt: string, mail: string): Promise<ApiResponse<AnalysisResult>> {
    return this.request<AnalysisResult>('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ task: 'analyze', prompt, mail }),
    });
  }

  async updateDeal(deal: Deal): Promise<ApiResponse<Deal>> {
    return this.request<Deal>(`/api/deals/${deal.id}`, {
      method: 'PUT',
      body: JSON.stringify(deal),
    });
  }

  async updateUserRole(userId: number, newRole: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ quyen: newRole }),
    });
  }

  async deleteUser(userId: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/users/${userId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
