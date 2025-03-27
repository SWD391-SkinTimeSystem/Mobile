import React, { useEffect ,useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { logoutUser } from '../services/Auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import  useRegister  from '../hooks/useAuth';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const menuItems = [
    { icon: 'person-outline', text: 'Your profile', type: 'Ionicons' },
    { icon: 'shopping-bag', text: 'My Appointment', type: 'Feather' },
    { icon: 'ticket-outline', text: 'My Tickets', type: 'Ionicons' },
    { icon: 'settings-outline', text: 'Settings', type: 'Ionicons' },
    { icon: 'help-circle-outline', text: 'Help Center', type: 'Ionicons' },
  ];
  const { user , getUser, isLoading, setIsLoading, error, success } = useRegister();
  useFocusEffect(
    useCallback(() => {
      console.log("Screen focused, calling getUser()");
      getUser();
    }, [])
  );

  
  if(isLoading) {
    return <Text>Loading...</Text>
  }
  if(error) {
    return <Text>Error: {error}</Text>
  }

  console.log("User là gì: ", user)
  const renderIcon = (item) => {
    if (item.type === 'Feather') {
      return <Feather name={item.icon} size={24} color="#555" />;
    }
    return <Ionicons name={item.icon} size={24} color="#555" />;
  };
  const handleLogout = async () => {
    // Handle logout
    const success = await logoutUser();
    if (success) {
      // Navigate to login screen
      navigation.replace("SignInScreen");
      console.log("Logout success!");
    } else {
      console.log("Logout failed!");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <ScrollView style={styles.scrollView}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: user?.avatar }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{user?.fullname}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
            >
              <View style={styles.menuIconContainer}>
                {renderIcon(item)}
              </View>
              <Text style={styles.menuText}>{item.text}</Text>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#ff3b30" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#006A55',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 32,
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 30,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff3b30',
    fontWeight: '500',
    marginLeft: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingBottom: 20, // Safe area for home indicator
    paddingTop: 10,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeNavItem: {
    alignItems: 'center',
  },
  activeNavText: {
    fontSize: 12,
    color: '#006A55',
    marginTop: 4,
  },
});

export default ProfileScreen;