import { useState } from "react";
import { INIT_TODO_LIST } from "../../../constants/data.js";
import { TodoList } from "../../organisms/TodoList";
import styles from "./styles.module.css";

export const TodoTemplate = () => {
  // const [ todos, setTodos ] = useState(INIT_TODO_LIST);

  // Todoリストの初期値をshowTodoListとしてstate管理
  const [ showTodoList, setShowTodoList ] = useState(INIT_TODO_LIST);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <section className={styles.common}>
        {showTodoList.length > 0 && (
          <TodoList
          todoList={showTodoList}
          />
        )}
      </section>
    </div>
  );
};

/**
 * @表示
 * h1 = OK, <INIT_TODO_LIST /> = NG
 */

// <section> showTodoListの要素の数が「0」以上 かつ TodoListコンポーネントが実行された場合
