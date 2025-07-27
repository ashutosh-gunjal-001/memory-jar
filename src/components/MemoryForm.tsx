import React, { useState, useEffect } from 'react';
import { useMemory, Memory } from '../../contexts/MemoryContext';

interface MemoryFormProps {
  memory?: Memory;
  onSubmit: () => void;
}

const MemoryForm: React.FC<MemoryFormProps> = ({ memory, onSubmit }) => {
  const { addMemory, editMemory } = useMemory();
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  // Initialize form if editing an existing memory
  useEffect(() => {
    if (memory) {
      setContent(memory.content);
      setImagePreview(memory.image);
    }
  }, [memory]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (error && e.target.value.trim()) {
      setError('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB max
        setError('Image is too large. Please upload an image smaller than 5MB.');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter a memory');
      return;
    }

    if (memory) {
      // Edit existing memory
      editMemory(memory.id, content, imagePreview);
    } else {
      // Add new memory
      addMemory(content, imagePreview);
    }
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content" className="handwritten" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
          What made you happy today?
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="Write your happy moment..."
          rows={4}
          className="handwritten"
          style={{ fontSize: '1.2rem' }}
        />
        {error && <p style={{ color: 'var(--error)', fontSize: '0.9rem', marginTop: '-0.5rem' }}>{error}</p>}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="image" className="handwritten" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
          Add a photo (optional)
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="image" className="btn secondary" style={{ margin: 0, cursor: 'pointer' }}>
            Choose Image
          </label>
          {imagePreview && (
            <button
              type="button"
              onClick={removeImage}
              className="btn secondary"
              style={{ backgroundColor: 'rgba(244, 67, 54, 0.1)', color: 'var(--error)', border: 'none' }}
            >
              Remove
            </button>
          )}
        </div>

        {imagePreview && (
          <div style={{ marginTop: '1rem' }}>
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
            />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
        <button type="submit" className="btn">
          {memory ? 'Save Changes' : 'Add Memory'}
        </button>
      </div>
    </form>
  );
};

export default MemoryForm; 