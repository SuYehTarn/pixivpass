import type { NextPage } from "next";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";
import SearchBar from "../components/SearchBar";
import ImageFrame from "../components/ImageFrame";
import { useState } from "react";

const Home: NextPage = () => {
  const [artworkInfo, setArtworkInfo] = useState({
    body: {},
  });
  const [imageUrl, setImageUrl] = useState("");
  return (
    <div className={styles.container}>
      <Head>
        <title>Pixiv Pass</title>
        <meta name="description" content="Pixiv Pass FireFox extension" />
      </Head>

      <SearchBar setArtworkInfo={setArtworkInfo} setImageUrl={setImageUrl} />

      {imageUrl && (
        <ImageFrame imageUrl={imageUrl || ""} artworkInfo={artworkInfo} />
      )}
    </div>
  );
};

export default Home;
