import { Table } from "./components/table/table.component";
import * as styles from "./app.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <Table />
      </div>
    </div>
  );
};

export default App;
