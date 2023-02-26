import styles from './TrailingPage.module.scss';

function TrailingPage() {
  return (
    <div className={styles.TrailingPage}>
      <div className={styles.TrailingPage__caption}>
        Error 404: Page not found
      </div>
    </div>
  );
}

export default TrailingPage;