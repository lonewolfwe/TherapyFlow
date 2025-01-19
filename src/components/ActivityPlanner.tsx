import { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import { Activity } from '../types/types';

interface ActivityPlannerProps {
  onActivitiesChange: (activities: Activity[]) => void;
  initialActivities?: Activity[];
}

export default function ActivityPlanner({ onActivitiesChange, initialActivities = [] }: ActivityPlannerProps) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [newActivity, setNewActivity] = useState({
    name: '',
    duration: 15,
    description: ''
  });

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const activity: Activity = {
      id: crypto.randomUUID(),
      name: newActivity.name,
      duration: newActivity.duration,
      description: newActivity.description
    };
    const updatedActivities = [...activities, activity];
    setActivities(updatedActivities);
    onActivitiesChange(updatedActivities);
    setNewActivity({ name: '', duration: 15, description: '' });
  };

  const removeActivity = (id: string) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
    onActivitiesChange(updatedActivities);
  };

  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Activities</h2>
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Total: {totalDuration} min
        </div>
      </div>

      <form onSubmit={handleAddActivity} className="mb-4 p-4 bg-white rounded-lg shadow">
        <input
          type="text"
          placeholder="Activity Name"
          value={newActivity.name}
          onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={newActivity.duration}
            onChange={(e) => setNewActivity({ ...newActivity, duration: parseInt(e.target.value) })}
            className="w-32 p-2 border rounded"
            min="1"
            required
          />
          <span className="self-center text-gray-600">minutes</span>
        </div>
        <textarea
          placeholder="Description"
          value={newActivity.description}
          onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Activity
        </button>
      </form>

      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="p-3 bg-white rounded-lg border"
          >
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium">{activity.name}</div>
              <button
                onClick={() => removeActivity(activity.id)}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-1 mb-1">
              <Clock className="w-4 h-4" /> {activity.duration} min
            </div>
            {activity.description && (
              <p className="text-sm text-gray-600">{activity.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
