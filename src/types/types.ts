export interface Patient {
  id: string;
  name: string;
  age: number;
  notes?: string;
}

export interface Goal {
  id: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Activity {
  id: string;
  name: string;
  duration: number;
  description: string;
}

export interface SessionPlan {
  id: string;
  patientId: string;
  date: string;
  goals: Goal[];
  activities: Activity[];
  notes?: string;
}
