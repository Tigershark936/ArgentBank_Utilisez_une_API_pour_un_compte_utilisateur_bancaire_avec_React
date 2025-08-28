import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//Le lien qui relie Redux ↔ React
import { Provider } from 'react-redux';
// Le store global
import { store } from './Store/index.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Toute l'app à maintenant accès au store glogal Redux */}
    <Provider store={store}>
      <App />
    </ Provider>
  </StrictMode>,
)
