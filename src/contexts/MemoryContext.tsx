import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

// Define types
export interface Memory {
  id: string;
  date: string;
  content: string;
  image?: string;
}

interface MemoryContextType {
  memories: Memory[];
  addMemory: (content: string, image?: string) => void;
  editMemory: (id: string, content: string, image?: string) => void;
  deleteMemory: (id: string) => void;
  getMemoriesByMonth: (month: number, year: number) => Memory[];
  getMemoriesByYear: (year: number) => Memory[];
  canAddMemoryToday: boolean;
}

interface MemoryProviderProps {
  children: ReactNode;
}

// Create the context
const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

// Provider component
export const MemoryProvider: React.FC<MemoryProviderProps> = ({ children }) => {
  const [memories, setMemories] = useState<Memory[]>(() => {
    // Load memories from localStorage on initial render
    const savedMemories = localStorage.getItem('memories');
    return savedMemories ? JSON.parse(savedMemories) : [];
  });

  const [canAddMemoryToday, setCanAddMemoryToday] = useState<boolean>(true);

  // Save memories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('memories', JSON.stringify(memories));
  }, [memories]);

  // Check if user can add a memory today
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const memoryAddedToday = memories.some(memory => memory.date.startsWith(today));
    setCanAddMemoryToday(!memoryAddedToday);
  }, [memories]);

  // Add a new memory
  const addMemory = (content: string, image?: string) => {
    const newMemory: Memory = {
      id: uuidv4(),
      date: new Date().toISOString(),
      content,
      image
    };

    setMemories(prevMemories => [...prevMemories, newMemory]);
  };

  // Edit an existing memory
  const editMemory = (id: string, content: string, image?: string) => {
    setMemories(prevMemories =>
      prevMemories.map(memory =>
        memory.id === id
          ? { ...memory, content, image: image !== undefined ? image : memory.image }
          : memory
      )
    );
  };

  // Delete a memory
  const deleteMemory = (id: string) => {
    setMemories(prevMemories => prevMemories.filter(memory => memory.id !== id));
  };

  // Get memories for a specific month
  const getMemoriesByMonth = (month: number, year: number) => {
    return memories.filter(memory => {
      const date = new Date(memory.date);
      return date.getMonth() === month && date.getFullYear() === year;
    });
  };

  // Get memories for a specific year
  const getMemoriesByYear = (year: number) => {
    return memories.filter(memory => {
      const date = new Date(memory.date);
      return date.getFullYear() === year;
    });
  };

  return (
    <MemoryContext.Provider
      value={{
        memories,
        addMemory,
        editMemory,
        deleteMemory,
        getMemoriesByMonth,
        getMemoriesByYear,
        canAddMemoryToday
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

// Custom hook to use the memory context
export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
}; 