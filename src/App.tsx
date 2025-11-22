import Sidebar from './shared/layouts/Sidebar'
import Header from './shared/layouts/Header'
function App() {
  return (
    <div className="flex">
    <div className="min-h-screen  w-1/6">
      <Sidebar />
    </div>
    <div className="w-full">
    <Header />
    </div>
    </div>
  )
}

export default App
