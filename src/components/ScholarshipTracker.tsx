import React, { useState } from 'react';
import { Award, Plus, Calendar, DollarSign, BookOpen } from 'lucide-react';

interface Scholarship {
  id: string;
  name: string;
  amount: string;
  deadline: string;
  requirements: string;
  status: 'not-started' | 'in-progress' | 'submitted' | 'awarded';
  notes: string;
}

const ScholarshipTracker = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([
    {
      id: '1',
      name: 'CSUSB Presidential Scholarship',
      amount: '$5,000',
      deadline: '2024-03-15',
      requirements: '3.5+ GPA, Leadership experience',
      status: 'in-progress',
      notes: 'Need to submit essay and letters of recommendation'
    },
    {
      id: '2',
      name: 'Finance Department Merit Award',
      amount: '$2,500',
      deadline: '2024-04-01',
      requirements: 'Finance major, 3.0+ GPA',
      status: 'not-started',
      notes: 'Application opens in February'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newScholarship, setNewScholarship] = useState({
    name: '',
    amount: '',
    deadline: '',
    requirements: '',
    notes: ''
  });

  const addScholarship = () => {
    const scholarship: Scholarship = {
      id: Date.now().toString(),
      ...newScholarship,
      status: 'not-started'
    };
    setScholarships([...scholarships, scholarship]);
    setNewScholarship({ name: '', amount: '', deadline: '', requirements: '', notes: '' });
    setShowForm(false);
  };

  const updateStatus = (id: string, status: Scholarship['status']) => {
    setScholarships(scholarships.map(s => s.id === id ? { ...s, status } : s));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awarded': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Scholarship Tracker</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Scholarship</span>
        </button>
      </div>

      {/* Add Scholarship Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Scholarship</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Scholarship Name"
              value={newScholarship.name}
              onChange={(e) => setNewScholarship({...newScholarship, name: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="text"
              placeholder="Amount"
              value={newScholarship.amount}
              onChange={(e) => setNewScholarship({...newScholarship, amount: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="date"
              value={newScholarship.deadline}
              onChange={(e) => setNewScholarship({...newScholarship, deadline: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="text"
              placeholder="Requirements"
              value={newScholarship.requirements}
              onChange={(e) => setNewScholarship({...newScholarship, requirements: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <textarea
              placeholder="Notes"
              value={newScholarship.notes}
              onChange={(e) => setNewScholarship({...newScholarship, notes: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 md:col-span-2"
              rows={3}
            />
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={addScholarship}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Add Scholarship
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Scholarships List */}
      <div className="space-y-4">
        {scholarships.map((scholarship) => (
          <div key={scholarship.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Award className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-gray-900">{scholarship.name}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">{scholarship.amount}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                    <span className="text-gray-700">{scholarship.deadline}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-700">{scholarship.requirements}</span>
                  </div>
                </div>
                {scholarship.notes && (
                  <p className="text-gray-600 mb-4">{scholarship.notes}</p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(scholarship.status)}`}>
                  {scholarship.status.replace('-', ' ')}
                </span>
                <select
                  value={scholarship.status}
                  onChange={(e) => updateStatus(scholarship.id, e.target.value as Scholarship['status'])}
                  className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="awarded">Awarded</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipTracker; 