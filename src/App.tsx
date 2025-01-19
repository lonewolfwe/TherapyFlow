import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import './index.css';
import PatientSelector from './components/PatientSelector';
import GoalInput from './components/GoalInput';
import ActivityPlanner from './components/ActivityPlanner';
import { Patient, Goal, Activity, SessionPlan } from './types/types';

function App() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [savedPlans, setSavedPlans] = useState<SessionPlan[]>(() => {
    const stored = localStorage.getItem('sessionPlans');
    return stored ? JSON.parse(stored) : [];
  });

  const handleSavePlan = () => {
    if (!selectedPatient) return;

    const newPlan: SessionPlan = {
      id: crypto.randomUUID(),
      patientId: selectedPatient.id,
      date: new Date().toISOString(),
      goals,
      activities
    };

    const updatedPlans = [...savedPlans, newPlan];
    setSavedPlans(updatedPlans);
    localStorage.setItem('sessionPlans', JSON.stringify(updatedPlans));

    // Reset form
    setGoals([]);
    setActivities([]);
    setSelectedPatient(null);

    alert('Session plan saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Session Planning Tool</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <PatientSelector
              onSelectPatient={setSelectedPatient}
              selectedPatientId={selectedPatient?.id}
            />
            <GoalInput onGoalsChange={setGoals} initialGoals={goals} />
          </div>
          
          <div className="space-y-6">
            <ActivityPlanner onActivitiesChange={setActivities} initialActivities={activities} />
            
            {selectedPatient && goals.length > 0 && activities.length > 0 && (
              <button
                onClick={handleSavePlan}
                className="w-full max-w-md mt-4 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Session Plan
              </button>
            )}
          </div>
        </div>

        {savedPlans.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Session Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPlans.slice(-3).reverse().map((plan) => (
                <div key={plan.id} className="p-4 bg-white rounded-lg shadow">
                  <div className="font-medium">
                    {new Date(plan.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {plan.goals.length} goals · {plan.activities.length} activities
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
