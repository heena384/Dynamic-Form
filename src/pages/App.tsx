import DynamicForm from "../components/DynamicForm/DynamicForm";
import GlobalStyle from "../style/global";
import {AppContainer, Title} from "./App.styles";

const App = () => {
  return (
    <>
    <AppContainer>
    <div className="app-content">
      <Title>Create Fuel Voucher</Title>
      <DynamicForm />
    </div>
    </AppContainer>
    <GlobalStyle/>
    </>
  );
};

export default App;
