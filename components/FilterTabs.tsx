import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type FilterType = 'all' | 'active' | 'completed';

interface FilterTabsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function FilterTabs({ filter, onFilterChange, counts }: FilterTabsProps) {
  const tabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Done' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            filter === tab.key && styles.tabActive
          ]}
          onPress={() => onFilterChange(tab.key)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.tabText,
            filter === tab.key && styles.tabTextActive
          ]}>
            {tab.label}
          </Text>
          <Text style={[
            styles.tabCount,
            filter === tab.key && styles.tabCountActive
          ]}>
            {counts[tab.key]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginHorizontal: 24,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    minHeight: 40,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    marginRight: 4,
    flexShrink: 0,
  },
  tabTextActive: {
    color: '#1F2937',
  },
  tabCount: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    textAlign: 'center',
    flexShrink: 0,
  },
  tabCountActive: {
    color: '#1F2937',
    backgroundColor: '#F3F4F6',
  },
});