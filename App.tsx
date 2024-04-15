
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import List from "./List";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <List/>
      </SafeAreaProvider >
    </QueryClientProvider >
  );
}
export default App;