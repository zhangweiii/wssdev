import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Modal from '../components/Modal';
import SignalForm from '../components/SignalForm';
import useStore from '../store';
import { useNavigate } from 'react-router-dom';
import { Signal } from '../types';

export default function SignalsPage() {
  const navigate = useNavigate();
  const { signals, addSignal, updateSignal, deleteSignal, currentProject, sendMessage } = useStore();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEditingSignal, setCurrentEditingSignal] = useState<string | null>(null);
  const [currentDeletingSignal, setCurrentDeletingSignal] = useState<string | null>(null);
  
  // Filter signals based on current project
  const filteredSignals = currentProject 
    ? signals.filter(signal => signal.projectId === currentProject.id)
    : [];
  
  const editingSignal = currentEditingSignal 
    ? signals.find(s => s.id === currentEditingSignal) 
    : null;
    
  const deletingSignal = currentDeletingSignal 
    ? signals.find(s => s.id === currentDeletingSignal) 
    : null;
  
  const handleAddSignal = (data: { name: string; description: string; payload: string }) => {
    if (!currentProject) return;
    
    addSignal({
      name: data.name,
      description: data.description,
      payload: data.payload,
      projectId: currentProject.id
    });
    setIsAddModalOpen(false);
  };
  
  const handleEditSignal = (data: { name: string; description: string; payload: string }) => {
    if (currentEditingSignal) {
      updateSignal(currentEditingSignal, {
        name: data.name,
        description: data.description,
        payload: data.payload,
      });
      setIsEditModalOpen(false);
      setCurrentEditingSignal(null);
    }
  };
  
  const handleDeleteSignal = () => {
    if (currentDeletingSignal) {
      deleteSignal(currentDeletingSignal);
      setIsDeleteModalOpen(false);
      setCurrentDeletingSignal(null);
    }
  };
  
  const openEditModal = (signalId: string) => {
    setCurrentEditingSignal(signalId);
    setIsEditModalOpen(true);
  };
  
  const openDeleteModal = (signalId: string) => {
    setCurrentDeletingSignal(signalId);
    setIsDeleteModalOpen(true);
  };
  
  const handleSendSignal = (signal: Signal) => {
    sendMessage(signal.payload);
    navigate('/test');
  };

  if (!currentProject) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-medium text-gray-900">No Project Selected</h2>
        <p className="mt-1 text-sm text-gray-500">Please select or create a project first</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <ArrowPathIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Go to Project Management
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Signal Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage WebSocket signals for project <span className="font-medium">{currentProject.name}</span>
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Signal
          </button>
        </div>
      </div>
      
      <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        {filteredSignals.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Signal Name
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  Description
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  Payload
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredSignals.map((signal) => (
                <tr key={signal.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {signal.name}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 max-w-xs">
                    <div className="truncate">{signal.description || '-'}</div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 font-mono max-w-xs">
                    <div className="truncate">
                      {signal.payload}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSendSignal(signal)}
                        className="text-green-600 hover:text-green-900 p-1"
                      >
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Send
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditModal(signal.id)}
                        className="text-primary-600 hover:text-primary-900 p-1"
                      >
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(signal.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-500">No signals for this project yet, please add a new signal</p>
          </div>
        )}
      </div>
      
      {/* Add Signal Modal */}
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Signal"
      >
        {currentProject && (
          <SignalForm
            onSubmit={handleAddSignal}
            onCancel={() => setIsAddModalOpen(false)}
          />
        )}
      </Modal>
      
      {/* Edit Signal Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setCurrentEditingSignal(null);
        }}
        title="Edit Signal"
      >
        {editingSignal && (
          <SignalForm
            initialData={editingSignal}
            onSubmit={handleEditSignal}
            onCancel={() => {
              setIsEditModalOpen(false);
              setCurrentEditingSignal(null);
            }}
          />
        )}
      </Modal>
      
      {/* Delete Signal Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCurrentDeletingSignal(null);
        }}
        title="Delete Signal"
        size="sm"
      >
        <div className="text-sm text-gray-500 mb-4">
          Are you sure you want to delete signal <span className="font-semibold">{deletingSignal?.name}</span>? This action cannot be undone.
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={handleDeleteSignal}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setCurrentDeletingSignal(null);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
