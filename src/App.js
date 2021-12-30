import "./css/app.css";
import Sidebar from "./components/Sidebar";
import TextChats from "./components/TextChats";
import MessageArea from "./components/MessageArea";

function App() {
  return (
    <div className="columns h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="">
        <TextChats></TextChats>
      </div>
      <div className="">
        <MessageArea></MessageArea>
      </div>
    </div>
  );
}

export default App;
