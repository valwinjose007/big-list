import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";

import colors from "../config/colors";
import postsApi from "../api/posts";
import Search from "../components/Search";
import Posts from "../components/Posts";

const MIN_RANDOM_NO = "1000000000";
const MAX_RANDOM_NO = "9000000000";
let rawPosts = [];

function HomeScreen(props) {
  const [posts, setPosts] = useState();
  const [searchText, setSearchText] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Page loading...");
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    let postsData = [];
    const { ok, data } = await postsApi.getPosts();
    if (!ok) return alert("Something went wrong while fetching posts.");
    postsData = makeRepeated(data, 30);

    let newPostsData = postsData.map((post, i) => {
      return {
        ...post,
        newID: i + 1,
        randomNo: generateRandomNumber(),
      };
    });

    rawPosts = newPostsData;
    setPosts(newPostsData);
    setLoading(false);
    //https://www.youtube.com/watch?v=8piMtJRN220
    //https://stackoverflow.com/questions/50672126/repeat-an-array-with-multiple-elements-multiple-times-in-javascript
  };

  //generating random numbers.
  function generateRandomNumber() {
    const difference = MAX_RANDOM_NO - MIN_RANDOM_NO;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    return rand;
  }

  const makeRepeated = (arr, repeats) =>
    [].concat(...new Array(repeats).fill([...arr]));

  const onChangeSearchInput = (value) => {
    setSearchText(value);
    const copyofPosts = [...rawPosts];
    let postsData = value
      ? copyofPosts.filter((post) =>
          post.body.toLowerCase().includes(value.toLowerCase())
        )
      : copyofPosts;

    postsData.forEach((post) => (post["randomNo"] = generateRandomNumber()));
    setPosts(postsData);
  };

  const reRender = () => {
    onChangeSearchInput("");
  };

  return (
    <View>
      <Image
        style={styles.image}
        source={require("../assets/doggo_walk.gif")}
      />
      <View style={styles.detailsContainer}>
        <Search onChangeInput={onChangeSearchInput} value={searchText} />
        <View style={styles.button}>
          <Button onPress={reRender} color="white" title="Re-render" />
        </View>
        {loading && <ActivityIndicator animating={loading} size={"large"} />}
        {!loading &&
          (posts?.length > 0 ? (
            <Posts posts={posts} />
          ) : (
            <Text style={styles.warnLabel}>No Record Found!</Text>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginHorizontal: 10,
    height: "80%",
  },
  image: {
    width: "100%",
    height: 250,
    top: 0,
    marginBottom: 10,
  },
  button: {
    width: "30%",
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
  warnLabel: {
    padding: 30,
    fontSize: 18,
    alignSelf: "center",
  },
});

export default HomeScreen;
