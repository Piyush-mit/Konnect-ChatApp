import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import LoadingFallback from "./components/Loadingfallback"
import Home from "./Pages/Home"
import NotFound from "./Pages/NotFound"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import Header from "./components/Header"

function App() {

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App;