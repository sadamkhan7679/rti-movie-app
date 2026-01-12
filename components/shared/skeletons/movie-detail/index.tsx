import React from "react";
import styles from "./styles.module.css";

export const MovieDetailSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroTitleSkeleton}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.posterSection}>
          <div className={styles.posterSkeleton}></div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.yearSkeleton}></div>
          <div className={styles.runtimeSkeleton}></div>
          <div className={styles.ratingSkeleton}></div>
          <div className={styles.buttonSkeleton}></div>
        </div>

        <div className={styles.overview}>
          <div className={styles.lineSkeleton}></div>
          <div className={styles.lineSkeleton}></div>
          <div className={styles.lineSkeleton}></div>
        </div>
      </div>
    </div>
  );
};
