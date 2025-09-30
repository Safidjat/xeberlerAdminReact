import { Toaster } from 'react-hot-toast'
import Table from './components/Table'

function App() {
  return (
    <>
      <Toaster   //этот тег итак сам по себе не виден но чтобы его на всех страницах не импортировать отдельно сразу везде чтобы было сюда кидаешь
        position="top-right"
        reverseOrder={true}
      />
      <main>
        <Table />
      </main>
    </>
  )
}

export default App
