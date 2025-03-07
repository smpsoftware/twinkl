import styled from "styled-components";
import { Table } from "./components/table/table.component";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100vh;
`;
const App = () => {
  return (
    <AppWrapper>
      <h1>Hello Twinkl!</h1>
      <Table />
    </AppWrapper>
  );
};

export default App;
