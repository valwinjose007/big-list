import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import colors from "../config/colors";

function Search({ value, onChangeInput }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={value}
        autoCorrect={false}
        onChangeText={(text) => onChangeInput(text)}
        autoCapitalize={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  textInput: {
    backgroundColor: colors.light,
    padding: 20,
    marginBottom: 10,
    width: "100%",
  },
});

export default Search;
