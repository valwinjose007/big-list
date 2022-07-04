import React from "react";
import { FlatList } from "react-native";

import { ListItem, ListItemSeperator } from "../components/list";

function Posts({ posts }) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(post, index) => index.toString()}
      renderItem={({ item }) => <ListItem item={item} />}
      ItemSeparatorComponent={ListItemSeperator}
    />
  );
}

export default Posts;
