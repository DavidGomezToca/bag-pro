export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
      <VerisonWatermark/>
    </div>
  )
}

function Logo() {
  return (
    <h1>🌴 Bag Pro 🎒</h1>
  )
}

function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your trip?</h3>
    </div>
  )
}

function PackingList() {
  return (
    <div className="list">
      LIST
    </div>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X.(X%)</em>
    </footer>
  )
}

function VerisonWatermark() {
  const version = require('../package.json').version;

  return (
    <div className="versionWatermark">{version}</div>
  );
}