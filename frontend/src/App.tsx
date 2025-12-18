import { DiaryList } from './components/DiaryList';
import { AppHeader } from './components/AppHeader';
import { FormModalProvider, DiariesProvider } from './contexts';
import './App.css';

function App() {
  return (
    <DiariesProvider>
      <FormModalProvider>
        <div className="app">
          <AppHeader />

          <main className="app-main">
            <div className="main-container">
              <DiaryList />
            </div>
          </main>
          
        </div>
      </FormModalProvider>
    </DiariesProvider>
  );
}

export default App;
