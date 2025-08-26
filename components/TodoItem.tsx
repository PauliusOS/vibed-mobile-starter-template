import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Check, X } from 'lucide-react-native';
import type { Todo } from '@/app/(tabs)/index';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox,
          todo.completed && styles.checkboxCompleted
        ]}>
          {todo.completed && (
            <Check size={16} color="#FFFFFF" strokeWidth={2.5} />
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[
          styles.text,
          todo.completed && styles.textCompleted
        ]}>
          {todo.text}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.7}
      >
        <X size={18} color="#9CA3AF" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 22,
  },
  textCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    padding: 4,
  },
});