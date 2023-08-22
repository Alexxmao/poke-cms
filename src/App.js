import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

function App() {
  return (
   <ChakraProvider>
    <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/shop" element={<Shop/>}/>
    </Routes>
    </Router>
   </ChakraProvider>
  );
}

export default App;
