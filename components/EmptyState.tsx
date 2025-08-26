import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { CircleCheck as CheckCircle, Circle, ListTodo } from 'lucide-react-native';

type FilterType = 'all' | 'active' | 'completed';

interface EmptyStateProps {
  filter: FilterType;
}

export function EmptyState({ filter }: EmptyStateProps) {
  const getEmptyStateContent = () => {
    switch (filter) {
      case 'active':
        return {
          icon: <CheckCircle size={48} color="#D1D5DB" strokeWidth={1.5} />,
          title: 'All caught up!',
          description: 'You have no active tasks. Time to add some new ones or take a well-deserved break.',
        };
      case 'completed':
        return {
          icon: <Circle size={48} color="#D1D5DB" strokeWidth={1.5} />,
          title: 'No completed tasks',
          description: 'Tasks you complete will appear here. Start checking off some items!',
        };
      default:
        return {
          icon: <ListTodo size={48} color="#D1D5DB" strokeWidth={1.5} />,
          title: 'No tasks yet',
          description: 'Add your first task above to get started with organizing your day.',
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {content.icon}
      </View>
      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.description}>{content.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});