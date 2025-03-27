import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const Header = ({navigation}) => {
  
  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor="#3a584a" />

      {/* Status Bar Time */}
      {/* <View style={styles.statusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={16} color="white" />
          <Ionicons name="wifi" size={16} color="white" />
          <Ionicons name="battery-full" size={16} color="white" />
        </View>
      </View> */}

      {/* Location Bar */}
      <View style={styles.actionRow}>

        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Location</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={18} color="#ff9d42" />
            <Text style={styles.locationText}>HO CHI MINH, VIET NAM</Text>
            <Ionicons name="chevron-down" size={16} color="white" />
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="calendar" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notification')}>
            <Feather name="bell" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actionRow}>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.filterIcon}>
          <Feather name="sliders" size={20} color="#888" />
        </TouchableOpacity>
      </View>
      </View>
      {/* Action buttons */}

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3a584a',
    paddingTop: 5,
    paddingBottom: 15,
    paddingHorizontal: 16,
    minHeight: 200,
    borderBottomLeftRadius: 20,  // Bo tròn góc dưới bên trái
    borderBottomRightRadius: 20, // Bo tròn góc dưới bên phải
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    color: 'white',
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  locationContainer: {
    marginBottom: 12,
  },
  locationLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 6,
    marginRight: 2,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: 24,
    padding: 0,
  },
  filterIcon: {
    padding: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;