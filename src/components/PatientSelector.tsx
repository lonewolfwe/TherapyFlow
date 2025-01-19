import { useState } from 'react';
import { Plus, UserCircle } from 'lucide-react';
import { Patient } from '../types/types';

interface PatientSelectorProps {
  onSelectPatient: (patient: Patient) => void;
  selectedPatientId?: string;
}

export default function PatientSelector({ onSelectPatient, selectedPatientId }: PatientSelectorProps) {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const stored = localStorage.getItem('patients');
    return stored ? JSON.parse(stored) : [];
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', notes: '' });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const patient: Patient = {
      id: crypto.randomUUID(),
      name: newPatient.name,
      age: parseInt(newPatient.age),
      notes: newPatient.notes
    };
    const updatedPatients = [...patients, patient];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    setNewPatient({ name: '', age: '', notes: '' });
    setShowAddForm(false);
    onSelectPatient(patient);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Select Patient</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddPatient} className="mb-4 p-4 bg-white rounded-lg shadow">
          <input
            type="text"
            placeholder="Patient Name"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <textarea
            placeholder="Notes"
            value={newPatient.notes}
            onChange={(e) => setNewPatient({ ...newPatient, notes: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Patient
          </button>
        </form>
      )}

      <div className="space-y-2">
        {patients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className={`w-full p-3 flex items-center gap-3 rounded-lg border ${
              selectedPatientId === patient.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <UserCircle className="w-6 h-6 text-gray-600" />
            <div className="text-left">
              <div className="font-medium">{patient.name}</div>
              <div className="text-sm text-gray-600">Age: {patient.age}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
