import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Goal } from '../types/types';

interface GoalInputProps {
  onGoalsChange: (goals: Goal[]) => void;
  initialGoals?: Goal[];
}

export default function GoalInput({ onGoalsChange, initialGoals = [] }: GoalInputProps) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [newGoal, setNewGoal] = useState({ description: '', priority: 'medium' as const });

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const goal: Goal = {
      id: crypto.randomUUID(),
      description: newGoal.description,
      priority: newGoal.priority
    };
    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    onGoalsChange(updatedGoals);
    setNewGoal({ description: '', priority: 'medium' });
  };

  const removeGoal = (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    onGoalsChange(updatedGoals);
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Session Goals</h2>
      
      <form onSubmit={handleAddGoal} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            placeholder="Enter new goal"
            className="flex-1 p-2 border rounded"
            required
          />
          <select
            value={newGoal.priority}
            onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as Goal['priority'] })}
            className="p-2 border rounded"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border"
          >
            <div className="flex-1">
              <p className="font-medium">{goal.description}</p>
              <span className={`text-sm ${
                goal.priority === 'high' ? 'text-red-600' :
                goal.priority === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {goal.priority} priority
              </span>
            </div>
            <button
              onClick={() => removeGoal(goal.id)}
              className="text-red-600 hover:text-red-800 p-1"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
