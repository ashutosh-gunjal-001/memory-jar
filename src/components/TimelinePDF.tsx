import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';

interface Memory {
  id: string;
  date: string;
  content: string;
  image?: string;
}

interface TimelinePDFProps {
  memories: Memory[];
  year: number;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1 solid #CCCCCC',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4A6D8C',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 10,
  },
  monthSection: {
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A6D8C',
    padding: 5,
    backgroundColor: '#F2F7FA',
  },
  memoryItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#F9F9F9',
    borderLeft: '3 solid #4A6D8C',
  },
  date: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666666',
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  image: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    marginTop: 10,
    alignSelf: 'center',
  },
  footerPage: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#666666',
  },
});

// Group memories by month
const groupMemoriesByMonth = (memories: Memory[]) => {
  const groups: { [month: string]: Memory[] } = {};
  
  memories.forEach(memory => {
    const date = new Date(memory.date);
    const monthIndex = date.getMonth();
    const monthName = format(date, 'MMMM');
    
    if (!groups[monthName]) {
      groups[monthName] = [];
    }
    
    groups[monthName].push(memory);
  });
  
  return Object.entries(groups)
    .map(([month, memories]) => ({
      month,
      monthIndex: new Date(`${month} 1, 2000`).getMonth(),
      memories,
    }))
    .sort((a, b) => a.monthIndex - b.monthIndex);
};

const TimelinePDF: React.FC<TimelinePDFProps> = ({ memories, year }) => {
  const groupedMemories = groupMemoriesByMonth(memories);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Memory Jar: {year}</Text>
          <Text style={styles.subtitle}>Your year in memories</Text>
        </View>
        
        {groupedMemories.map(group => (
          <View key={group.month} style={styles.monthSection}>
            <Text style={styles.monthTitle}>{group.month}</Text>
            
            {group.memories.map(memory => (
              <View key={memory.id} style={styles.memoryItem}>
                <Text style={styles.date}>{format(new Date(memory.date), 'MMMM d, yyyy')}</Text>
                <Text style={styles.content}>{memory.content}</Text>
                {memory.image && (
                  <Image 
                    src={memory.image} 
                    style={styles.image} 
                  />
                )}
              </View>
            ))}
          </View>
        ))}
        
        <Text style={styles.footerPage} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

export default TimelinePDF; 