import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'tamagui';
const ProductsListItem = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://picsum.photos/200/300',
          width: 200,
          height: 300,
        }}
      />
      <Text>ProductsListItem</Text>
    </View>
  );
};

export default ProductsListItem;

const styles = StyleSheet.create({
  container: {},
});
