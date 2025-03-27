import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const RadialGradientOverlay = ({ color }) => {
  return (
    <>
      {/* Bottom Right Concentrated Gradient */}
      <View 
        style={[
          styles.radialOverlay, 
          styles.bottomRightGradient,
          { backgroundColor: color }
        ]} 
      />
      
      {/* Top Left Gradient */}
      <View 
        style={[
          styles.radialOverlay, 
          styles.topLeftGradient,
          { backgroundColor: color }
        ]} 
      />
      
      {/* Top Right Gradient */}
      <View 
        style={[
          styles.radialOverlay, 
          styles.topRightGradient,
          { backgroundColor: color }
        ]} 
      />
      
      {/* Bottom Left Gradient */}
      <View 
        style={[
          styles.radialOverlay, 
          styles.bottomLeftGradient,
          { backgroundColor: color }
        ]} 
      />
    </>
  );
};

const SliderItem = ({ item }) => {
  return (
    <View style={styles.sliderContainer}>
      <ImageBackground 
        source={{ uri: item.image_url }}
        style={styles.sliderItem}
        imageStyle={styles.backgroundImage}
      >
        {/* Color Overlay */}
        <RadialGradientOverlay color="#445A4B" />
        
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.discountText}>
              {item.start_date}
            </Text>
            <TouchableOpacity 
              style={styles.orderButton} 
              activeOpacity={0.7}
            >
              <Text style={styles.orderButtonText}>
                Khám phá ngay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const SliderComponent = ({events}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={events}
        renderItem={({ item }) => <SliderItem item={item} />}
        keyExtractor={(item) => item.event_id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={styles.flatlistContainer}
      />
      
      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {events.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot, 
              index === activeIndex ? styles.activeDot : styles.inactiveDot
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    width: width - 60, // Giảm chiều rộng để canh giữa
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sliderItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      }
    })
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  radialOverlay: {
    position: 'absolute',
    width: width,
    height: width,
    borderRadius: width / 2,
    opacity: 0,
  },
  bottomRightGradient: {
    bottom: -width/2,
    right: -width/2,
  },
  topLeftGradient: {
    top: -width/2,
    left: -width/2,
    opacity: 0.6,
  },
  topRightGradient: {
    top: -width/2,
    right: -width/2,
    opacity: 0,
  },
  bottomLeftGradient: {
    bottom: -width/2,
    left: -width/2,
    opacity: 0.7,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    zIndex: 1,
  },
  textContainer: {
    flex: 1.2,
    paddingRight: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  discountText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 12,
    fontWeight: '600',
  },
  orderButton: {
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#B59154',
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  }
});

export default SliderComponent;