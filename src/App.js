import "./css/app.css";
import Sidebar from "./components/Sidebar";
import TextChats from "./components/TextChats";
import MessageArea from "./components/MessageArea";

function App() {
  return (
    <div className="columns h-screen">
      <Sidebar />
      <TextChats></TextChats>
      <MessageArea></MessageArea>
    </div>
  );
}

export default App;
