export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  isEdit: boolean;
  createdAt: number;
  updatedAt: number;
  urgentLevel: number;
}

export interface PreTask {
  title: string;
  description: string;
  urgentLevel: number;
}
