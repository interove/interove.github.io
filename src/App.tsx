import Home from "./pages/Home";

export default function App() {
  try {
    return <Home />;
  } catch (error) {
    console.error("App crashed:", error);
    return <div>出错了：{String(error)}</div>;
  }
}
