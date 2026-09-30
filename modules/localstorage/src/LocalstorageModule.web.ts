import { registerWebModule, NativeModule } from 'expo';

// LocalstorageModule is not available on the web platform.
class LocalstorageModule extends NativeModule<{}> {}

export default registerWebModule(LocalstorageModule, 'LocalstorageModule');
