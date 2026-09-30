import { NativeModule, requireNativeModule } from 'expo';

declare class LocalstorageModule extends NativeModule<{}> {
  getData:() => string;
  postData:(data:string) => string;
}

export default requireNativeModule<LocalstorageModule>('Localstorage');
