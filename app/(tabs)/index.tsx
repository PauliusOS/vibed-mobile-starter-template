import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { AddTodoForm } from '@/components/AddTodoForm';
import { TodoItem } from '@/components/TodoItem';
import { FilterTabs } from '@/components/FilterTabs';
import { EmptyState } from '@/components/EmptyState';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

export interface Todo {
  _id: Id<"todos">;
  text: string;
  completed: boolean;
  createdAt: number;
  userId: string;
}

type FilterType = 'all' | 'active' | 'completed';

export default function TodosScreen() {
  const [filter, setFilter] = useState<FilterType>('all');
  
  const todos = useQuery(api.todos.list) || [];
  const debugAuth = useQuery(api.todos.debugAuth);
  const addTodoMutation = useMutation(api.todos.add);
  const toggleTodoMutation = useMutation(api.todos.toggle);
  const deleteTodoMutation = useMutation(api.todos.remove);
  
  // Temporary debug logging
  React.useEffect(() => {
    console.log("Debug auth result:", debugAuth);
  }, [debugAuth]);

  const addTodo = async (text: string) => {
    try {
      await addTodoMutation({ text: text.trim() });
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodoMutation({ id });
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const deleteTodo = async (id: Id<"todos">) => {
    try {
      await deleteTodoMutation({ id });
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter((todo: Todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo: Todo) => todo.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>
          {activeTodosCount} active, {completedTodosCount} completed
        </Text>
        
        {/* Temporary Debug Info */}
        <View style={{backgroundColor: '#f0f0f0', padding: 10, marginTop: 10, borderRadius: 5}}>
          <Text style={{fontSize: 12, color: '#666'}}>
            Debug: Auth = {debugAuth?.authenticated ? 'YES' : 'NO'} | 
            User = {debugAuth?.identity?.email || 'none'}
          </Text>
        </View>
      </View>

      <AddTodoForm onAddTodo={addTodo} />

      <FilterTabs
        filter={filter}
        onFilterChange={setFilter}
        counts={{
          all: todos.length,
          active: activeTodosCount,
          completed: completedTodosCount,
        }}
      />

      <ScrollView 
        style={styles.todosContainer}
        contentContainerStyle={styles.todosContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTodos.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  todosContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  todosContent: {
    paddingBottom: 100,
    flexGrow: 1,
  },
});