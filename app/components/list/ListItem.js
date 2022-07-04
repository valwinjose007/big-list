import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import colors from "../../config/colors";

function ListItem({ item }) {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text>{item.newID}</Text>
        <Text>{item.body}</Text>
        <Text>{item.randomNo}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.light,
  },
});

export default ListItem;
