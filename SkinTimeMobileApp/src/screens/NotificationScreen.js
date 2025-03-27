import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationScreen = ({navigation}) => {
  const todayNotifications = [
    {
      id: 1,
      title: 'Order Shipped',
      time: '1h',
      icon: 'local-shipping',
      iconType: 'material',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 2,
      title: 'Sale Alert',
      time: '1h',
      icon: 'pricetag-outline',
      iconType: 'ionicon',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 3,
      title: 'Product Review Request',
      time: '1h',
      icon: 'star-outline',
      iconType: 'ionicon',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  const yesterdayNotifications = [
    {
      id: 4,
      title: 'Order Shipped',
      time: '1d',
      icon: 'local-shipping',
      iconType: 'material',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 5,
      title: 'New Paypal Added',
      time: '1d',
      icon: 'credit-card-outline',
      iconType: 'material-community',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 6,
      title: 'Sale Alert',
      time: '1d',
      icon: 'pricetag-outline',
      iconType: 'ionicon',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      isActive: true
    }
  ];

  const renderIcon = (notification) => {
    const { iconType, icon } = notification;
    const iconSize = 20;
    const iconColor = '#333';
    const iconContainerStyle = [
      styles.iconContainer,
      notification.title === 'Sale Alert' && styles.saleIconContainer,
      notification.title === 'Order Shipped' && styles.shippingIconContainer,
      notification.title === 'Product Review Request' && styles.reviewIconContainer,
      notification.title === 'New Paypal Added' && styles.paypalIconContainer,
    ];

    switch (iconType) {
      case 'material':
        return (
          <View style={iconContainerStyle}>
            <Icon name={icon} size={iconSize} color={iconColor} />
          </View>
        );
      case 'ionicon':
        return (
          <View style={iconContainerStyle}>
            <Ionicons name={icon} size={iconSize} color={iconColor} />
          </View>
        );
      case 'material-community':
        return (
          <View style={iconContainerStyle}>
            <MaterialCommunityIcons name={icon} size={iconSize} color={iconColor} />
          </View>
        );
      default:
        return null;
    }
  };

  const renderNotificationItem = (notification) => {
    return (
      <View 
        key={notification.id} 
        style={[
          styles.notificationItem,
          notification.isActive && styles.activeNotificationItem
        ]}
      >
        {renderIcon(notification)}
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
          <Text style={styles.notificationDescription} numberOfLines={2}>
            {notification.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>3 New</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Today Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TODAY</Text>
            <TouchableOpacity>
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
          
          {todayNotifications.map(notification => renderNotificationItem(notification))}
        </View>
        
        {/* Yesterday Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>YESTERDAY</Text>
            <TouchableOpacity>
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
          
          {yesterdayNotifications.map(notification => renderNotificationItem(notification))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  newBadge: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
    letterSpacing: 0.5,
  },
  markAllText: {
    fontSize: 12,
    color: '#757575',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  activeNotificationItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#2e7d32',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#e0e0e0',
  },
  shippingIconContainer: {
    backgroundColor: '#e3f2fd',
  },
  saleIconContainer: {
    backgroundColor: '#e8f5e9',
  },
  reviewIconContainer: {
    backgroundColor: '#fff3e0',
  },
  paypalIconContainer: {
    backgroundColor: '#e8eaf6',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  notificationTime: {
    fontSize: 12,
    color: '#757575',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
});

export default NotificationScreen;