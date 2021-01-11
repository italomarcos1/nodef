import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import HashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
