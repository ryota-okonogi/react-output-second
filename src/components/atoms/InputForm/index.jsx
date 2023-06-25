import styles from "./styles.module.css";

export const InputForm = (props) => {
  const { inputValue, placeholder, handleChangeValue, handleKeyDown } = props;

  return (
    <input
      className={styles.input}
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChangeValue}
      onKeyDown={handleKeyDown}
    />
  );
};
