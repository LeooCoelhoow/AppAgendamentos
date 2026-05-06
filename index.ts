import { registerRootComponent } from 'expo';

import App from './src/App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App);
// Isso também garante que, independentemente de você carregar o aplicativo no Expo Go ou em uma versão nativa, ele funcionará corretamente,
// Ambiente configurado
registerRootComponent(App);
