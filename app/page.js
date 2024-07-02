import Image from "next/image";
import styles from "./page.module.css";
import CurrencyConverter from "./components/CurrencyConverter";
import TransferHistory from "./components/TransferHistory";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Currency Converter</h1>
      <TransferHistory />
    </main>
  );
}
