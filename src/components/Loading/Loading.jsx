import { Progress } from "antd";
import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <Progress
      percent="100"
      percentPosition={{ align: "center", type: "inner" }}
      className={`${styles.progress}`}
      status="active"
      showInfo={false}
    />
  );
}
