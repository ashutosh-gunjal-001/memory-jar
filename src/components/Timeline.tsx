import React, { useState } from 'react';
import { format } from 'date-fns';
import { useMemory } from '../../contexts/MemoryContext';
import MemoryItem from '../memories/MemoryItem';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TimelinePDF from './TimelinePDF';

interface GroupedMemories {
  [month: string]: {
    month: string;
    monthIndex: number;
    memories: Array<{
      id: string;
      date: string;
      content: string;
      image?: string;
    }>;
  };
}

const Timeline: React.FC = () => {
  const { memories } = useMemory();
  const [year, setYear] = useState(new Date().getFullYear());
  
  // Get available years from memories
  const getAvailableYears = () => {
    const years = new Set<number>();
    memories.forEach(memory => {
      const memoryYear = new Date(memory.date).getFullYear();
      years.add(memoryYear);
    });
    return Array.from(years).sort((a, b) => b - a); // Sort years descending
  };
  
  const availableYears = getAvailableYears();
  
  // Group memories by month for the selected year
  const groupedMemories = memories
    .filter(memory => new Date(memory.date).getFullYear() === year)
    .reduce((groups: GroupedMemories, memory) => {
      const date = new Date(memory.date);
      const monthIndex = date.getMonth();
      const monthName = format(date, 'MMMM');
      
      if (!groups[monthName]) {
        groups[monthName] = {
          month: monthName,
          monthIndex,
          memories: []
        };
      }
      
      groups[monthName].memories.push(memory);
      return groups;
    }, {});
  
  // Sort groups by month
  const sortedGroups = Object.values(groupedMemories).sort(
    (a, b) => a.monthIndex - b.monthIndex
  );
  
  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ margin: 0 }}>Your {year} Timeline</h2>
          <p style={{ color: 'var(--text-light)', margin: '0.5rem 0 0 0' }}>
            All your memories from {year}, organized by month
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select 
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--primary-light)',
              backgroundColor: 'white',
              color: 'var(--text)',
              fontFamily: 'var(--font-family)',
              fontSize: '1rem'
            }}
          >
            {availableYears.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          
          {sortedGroups.length > 0 && (
            <PDFDownloadLink
              document={<TimelinePDF memories={memories.filter(memory => new Date(memory.date).getFullYear() === year)} year={year} />}
              fileName={`memory-jar-${year}.pdf`}
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontWeight: 500,
                display: 'inline-block'
              }}
            >
              Export PDF
            </PDFDownloadLink>
          )}
        </div>
      </div>
      
      {sortedGroups.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem 2rem',
          backgroundColor: 'var(--secondary)',
          borderRadius: '12px',
          color: 'var(--primary-dark)'
        }}>
          <h3 className="handwritten" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>No memories for {year}</h3>
          <p>You haven't added any memories for this year yet.</p>
        </div>
      ) : (
        sortedGroups.map(group => (
          <div key={group.month}>
            <h3 className="month-header">{group.month}</h3>
            <div className="timeline">
              {group.memories.map((memory, index) => (
                <div key={memory.id} className="timeline-entry">
                  <MemoryItem memory={memory} isTimeline={true} />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Timeline; 