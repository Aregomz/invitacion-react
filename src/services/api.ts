const API_BASE_URL = 'https://invitacion-back-production.up.railway.app';

export interface RSVPData {
  name: string;
  phone: string;
}

export interface RSVPResponse {
  success: boolean;
  message: string;
  data: {
    rsvpId: number;
    userId: number;
    eventId: number;
    eventTitle: string;
    status: string;
    responseDate: string;
  };
}

export interface CheckRSVPResponse {
  success: boolean;
  data: {
    isRegistered: boolean;
    user: {
      id: number;
      name: string;
      phone: string;
    };
    events: Array<{
      id: number;
      title: string;
      date: string;
      time: string;
      location: string;
    }>;
  };
}

export interface HealthResponse {
  success: boolean;
  message: string;
  timestamp: string;
  environment: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // POST /api/rsvp - Registrar confirmación de asistencia
  async submitRSVP(data: RSVPData): Promise<RSVPResponse> {
    return this.request<RSVPResponse>('/api/rsvp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // GET /api/rsvp/check/{phone} - Verificar si un teléfono ya está registrado
  async checkRSVP(phone: string): Promise<CheckRSVPResponse> {
    return this.request<CheckRSVPResponse>(`/api/rsvp/check/${phone}`, {
      method: 'GET',
    });
  }

  // GET /health - Verificar estado del servidor
  async checkHealth(): Promise<HealthResponse> {
    return this.request<HealthResponse>('/health', {
      method: 'GET',
    });
  }
}

// Instancia del servicio API
export const apiService = new ApiService(API_BASE_URL); 