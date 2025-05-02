import { useState } from 'react'
import Header from './components/Header'
import GithubSearch from './components/GithubSearch'
import NumberBaseball from './components/NumberBaseball'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'github' | 'baseball'>('github')

  return (
    <div>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
        {activeTab === 'github' ? <GithubSearch /> : <NumberBaseball />}
      </main>
    </div>
  )
}

export default App
