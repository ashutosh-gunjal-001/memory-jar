import React, { useState } from 'react';
import { useMemory } from '../../contexts/MemoryContext';
import MemoryItem from './MemoryItem';
import Modal from '../common/Modal';
import MemoryForm from './MemoryForm';

const MemoryList: React.FC = () => {
  const { memories, canAddMemoryToday } = useMemory();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Sort memories by date (newest first)
  const sortedMemories = [...memories].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{ margin: 0 }}>Your Memories</h2>
        <button 
          className="btn"
          onClick={() => setIsAddModalOpen(true)}
          disabled={!canAddMemoryToday}
          title={!canAddMemoryToday ? "You've already added a memory today" : ""}
        >
          Add Today's Memory
        </button>
      </div>
      
      {sortedMemories.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem 2rem',
          backgroundColor: 'var(--secondary)',
          borderRadius: '12px',
          color: 'var(--primary-dark)'
        }}>
          <h3 className="handwritten" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Your jar is empty</h3>
          <p>Start capturing your happy moments by adding your first memory.</p>
          <button 
            className="btn"
            onClick={() => setIsAddModalOpen(true)}
            style={{ marginTop: '1.5rem' }}
            disabled={!canAddMemoryToday}
          >
            Add Your First Memory
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {sortedMemories.map(memory => (
            <MemoryItem key={memory.id} memory={memory} />
          ))}
        </div>
      )}
      
      {/* Add Memory Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Today's Memory"
      >
        <MemoryForm onSubmit={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default MemoryList; 