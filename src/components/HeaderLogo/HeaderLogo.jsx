import logo from "../../assets/Logo.svg";
import styles from "./headerLogo.module.scss";
export default function HeaderLogo() {
  return (
    <div className={`${styles.logo_wrap}`}>
      <img src={logo} alt="Логотип авиасейлс" />
    </div>
  );
}
