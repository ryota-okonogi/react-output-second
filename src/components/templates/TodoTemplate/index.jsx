import { useState } from "react";
import { InputForm } from "../../atoms/InputForm";
import { AddTodo } from "../../organisms/AddTodo";
import { TodoList } from "../../organisms/TodoList";
import { searchTodo } from "../../../utils/todoLogic";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data.js";
import styles from "./style.module.css";

export const TodoTemplate = () => {
  // 元のTodoList
  const [ originTodoList, setOriginTodoList ] = useState(INIT_TODO_LIST);

  // 入力したタイトルを追加
  const [ addInputValue, setAddInputValue ] = useState("");

  // Todo採番ID
  const [ uniqueId, setUniqueId ] = useState(INIT_UNIQUE_ID);

  // 検索キーワード
  const [ searchKeyword, setSearchKeyword ] = useState("");

  // 更新後のTodoList
  const [ showTodoList, setShowTodoList ] = useState(INIT_TODO_LIST);

  // addInputValueの変更処理(onChangeAddInputValue)
  const onChangeAddInputValue = (e) => {
    setAddInputValue(e.target.value);
  }

  // 表示用Todoリスト更新処理
  const updateShowTodoList = (newTodoList, keyword) => {
    setShowTodoList(
      keyword !== "" ? searchTodo(newTodoList, keyword) : newTodoList
    );
  };

  /*
  keywordが入力されている場合
    = searchTodoに(newTodoList, keyword)を渡した処理結果を表示する
  そうでない場合 = newTodoListを表示する
  */

  // Todo新規登録処理(handleAddTodo)
  const handleAddTodo = (e) => {
    // Enterキーが押された時にTodoを追加
    if (e.key === "Enter" && addInputValue !== "") { // [条件] Enterキーを押すイベントが発生した時 + 入力値が空でない場合
      const nextUniqueId = uniqueId + 1; // nextUniqueId = 元の配列の要素数 + 1
      // Todo追加処理: 元の配列を破壊しないように配列のコピーを作成して、その値でstateを更新する
      // スプレッド構文を使用する
      const newTodoList = [
        ...originTodoList, // 元の配列を展開
        {
          id: nextUniqueId, // 元の配列に新規登録するTodoを足したid
          title: addInputValue, // 入力値がそのままタイトルになる
        },
      ];
      setOriginTodoList(newTodoList); // 新規登録によって追加したTodoを含めたものを新たな配列として生成する

      // Todo追加処理に検索キーワードを当てはめて更新後のTodoListを表示する
      updateShowTodoList(newTodoList, searchKeyword)

      // 採番IDを更新 ← 更新用関数のsetUniqueIdで、元の配列の要素数 + 1 する
      setUniqueId(nextUniqueId);
      // todo追加後、入力値をリセット
      setAddInputValue(""); // 入力したタイトルを追加する処理に空文字を入れることで「入力値をリセット」することが可能になる
    }
  };

  // Todo削除処理
  const handleDeleteTodo = (targetId, targetTitle) => {
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {
      const newTodoList = originTodoList.filter((todo) => todo.id !== targetId);
      setOriginTodoList(newTodoList);

      updateShowTodoList(newTodoList, searchKeyword);
    }
  };

  // 検索処理
  const handleSearchTodo = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    updateShowTodoList(originTodoList, keyword);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <section className={styles.common}>
        <AddTodo
          addInputValue={addInputValue}
          onChangeTodo={onChangeAddInputValue}
          handleAddTodo={handleAddTodo}
        />
      </section>
      <section className={styles.common}>
        <InputForm
          inputValue={searchKeyword}
          placeholder={"Search Keyword"}
          handleChangeValue={handleSearchTodo}
        />
      </section>
      <section className={styles.common}>
        {showTodoList.length > 0 && (
          <TodoList
            todoList={showTodoList}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}
      </section>
    </div>
  );
};
