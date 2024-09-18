import styles from "./index.module.scss";

const Loading = () => {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center fixed top-0 left-0 z-50 bg-background">
      <div className={styles["cy-loading"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
