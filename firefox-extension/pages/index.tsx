import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";
import SearchBar from "../components/SearchBar";
import ImageFrame from "../components/ImageFrame";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pixiv Pass</title>
        <meta name="description" content="A FireFox extension" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchBar />

      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;