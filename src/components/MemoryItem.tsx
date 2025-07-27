import React, { useState } from 'react';
import { format } from 'date-fns';
import { Memory, useMemory } from '../../contexts/MemoryContext';
import Modal from '../common/Modal';
import MemoryForm from './MemoryForm';

interface MemoryItemProps {
  memory: Memory;
  isTimeline?: boolean;
}

const MemoryItem: React.FC<MemoryItemProps> = ({ memory, isTimeline = false }) => {
  const { deleteMemory } = useMemory();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  const handleDelete = () => {
    deleteMemory(memory.id);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <>
      <div className={`memory-entry ${!isTimeline ? 'memory-float' : ''}`}>
        <p className="date">{formatDate(memory.date)}</p>
        <p className="content handwritten">{memory.content}</p>
        
        {memory.image && (
          <img 
            src={memory.image} 
            alt="Memory" 
            className="memory-image" 
            onClick={() => setIsImageModalOpen(true)}
            style={{ cursor: 'pointer' }}
          />
        )}
        
        {!isTimeline && (
          <div className="memory-actions">
            <button 
              className="action-button" 
              onClick={() => setIsEditModalOpen(true)}
              aria-label="Edit memory"
            >
              ✏️
            </button>
            <button 
              className="action-button" 
              onClick={() => setIsDeleteConfirmOpen(true)}
              aria-label="Delete memory"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
      
      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Memory"
      >
        <MemoryForm 
          memory={memory} 
          onSubmit={() => setIsEditModalOpen(false)} 
        />
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="Delete Memory"
      >
        <div>
          <p>Are you sure you want to delete this memory? This action cannot be undone.</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button 
              className="btn secondary" 
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="btn" 
              onClick={handleDelete}
              style={{ backgroundColor: 'var(--error)' }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Image Modal */}
      {memory.image && (
        <Modal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          title={formatDate(memory.date)}
        >
          <div style={{ textAlign: 'center' }}>
            <img 
              src={memory.image} 
              alt="Memory full size" 
              style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px' }}
            />
            <p className="handwritten" style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
              {memory.content}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MemoryItem; 