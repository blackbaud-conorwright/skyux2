import { SkyToast, ToastOptions } from './toast';
import { ToastrService, ActiveToast, IndividualConfig } from 'ngx-toastr';

describe('SkyToast class', () => {
  class TestComponent {}
  let toast: SkyToast;
  let fakeToastrService: ToastrService;

  beforeEach(() => {
    fakeToastrService = {} as ToastrService;
    toast = new SkyToast(fakeToastrService);
  });

  describe('openMessage() method', () => {
    it('should open a toast with the given message and configuration', function() {
      let internalConfig: IndividualConfig;
      let internalMessage: string;
      let configuration: ToastOptions = {
        toastType: 'error',
        timeOut: 23,
        extendedTimeOut: 48,
        disableTimeout: false,
        message: undefined
      };
      
      fakeToastrService.error = (message: string, title?: string, override?: IndividualConfig) => {
        internalConfig = override;
        expect(title).toBe(undefined);
        internalMessage = message;
        return {} as ActiveToast;
      };
      toast.openMessage('My message', configuration);

      expect(internalMessage).toBeTruthy();
      expect(internalMessage).toBe('My message');

      expect(internalConfig).toBeTruthy();
      expect(internalConfig.timeOut).toBe(23);
      expect(internalConfig.extendedTimeOut).toBe(48);
      expect(internalConfig).toBeTruthy();
      expect(internalConfig.toastClass).toBe('sky-toast-error');
    });
  });

  describe('openCustom() method', () => {
    it('should open a custom toast with the given component type and configuration', function() {
      let internalConfig: IndividualConfig;
      let configuration: ToastOptions = {
        toastType: 'error',
        timeOut: 23,
        extendedTimeOut: 48,
        disableTimeout: false
      };
      
      fakeToastrService.error = (message: string, title?: string, override?: IndividualConfig) => {
        internalConfig = override;
        expect(title).toBe(undefined);
        expect(message).toBe(undefined);
        return {} as ActiveToast;
      };
      toast.openCustom(TestComponent, configuration);

      expect(internalConfig).toBeTruthy();
      expect(internalConfig.timeOut).toBe(23);
      expect(internalConfig.extendedTimeOut).toBe(48);
      expect(internalConfig.toastClass).toBe('sky-toast-error');
      expect(internalConfig.toastComponent).toBe(TestComponent);
    });
  });

  describe('open() method', () => {
    it('should open a toast with the given message and configuration', function() {
      let internalConfig: IndividualConfig;
      let internalMessage: string;
      let configuration: ToastOptions = {
        toastType: 'error',
        timeOut: 23,
        extendedTimeOut: 48,
        disableTimeout: false,
        message: 'My message'
      };
      
      fakeToastrService.error = (message: string, title?: string, override?: IndividualConfig) => {
        internalConfig = override;
        expect(title).toBe(undefined);
        internalMessage = message;
        return {} as ActiveToast;
      };
      toast.open(configuration);

      expect(internalMessage).toBeTruthy();
      expect(internalMessage).toBe('My message');

      expect(internalConfig).toBeTruthy();
      expect(internalConfig.timeOut).toBe(23);
      expect(internalConfig.extendedTimeOut).toBe(48);
      expect(internalConfig.toastClass).toBe('sky-toast-error');
    });

    it('should open a custom toast with the given component type and configuration', function() {
      let internalConfig: IndividualConfig;
      let configuration: ToastOptions = {
        toastType: 'error',
        timeOut: 23,
        extendedTimeOut: 48,
        disableTimeout: false,
        customComponentType: TestComponent
      };
      
      fakeToastrService.error = (message: string, title?: string, override?: IndividualConfig) => {
        internalConfig = override;
        expect(title).toBe(undefined);
        expect(message).toBe(undefined);
        return {} as ActiveToast;
      };
      toast.open(configuration);

      expect(internalConfig).toBeTruthy();
      expect(internalConfig.timeOut).toBe(23);
      expect(internalConfig.extendedTimeOut).toBe(48);
      expect(internalConfig.toastClass).toBe('sky-toast-error');
      expect(internalConfig.toastComponent).toBe(TestComponent);
    });

    it('should require a message or customComponentType parameter', function() {
      try {
        toast.open({});
      }
      catch(error) {
        expect(error).toBe('You must provide either a message or a customComponentType.');
      }
    });

    it('should reject both a message and customComponentType being supplied', function() {
      try {
        toast.open({message: 'My message', customComponentType: TestComponent});
      }
      catch(error) {
        expect(error).toBe('You must not provide both a message and a customComponentType.');
      }
    });

    it('should set timeouts to 0 when disableTimeout is true', function () {
      let internalConfig: Partial<IndividualConfig>;
      fakeToastrService.info = (message: string, title?: string, override?: Partial<IndividualConfig>)=> {internalConfig = override; return {} as ActiveToast;}

      toast.open({
        message: 'info message',
        toastType: 'info',
        disableTimeout: true,
        timeOut: 22,
        extendedTimeOut: 44});

      expect(internalConfig).toBeTruthy();
      expect(internalConfig.timeOut).toBe(0);
      expect(internalConfig.extendedTimeOut).toBe(0);
    });

    it('should open specific toast types', function () {
      let infoCalled: boolean = false;
      let warningCalled: boolean = false;
      let errorCalled: boolean = false;

      fakeToastrService.info = () => {infoCalled = true; return {} as ActiveToast;}
      fakeToastrService.warning = () => {warningCalled = true; return {} as ActiveToast;}
      fakeToastrService.error = () => {errorCalled = true; return {} as ActiveToast;}

      toast.open({message: 'info message', toastType: 'info'});
      toast.open({message: 'warning message', toastType: 'warning'});
      toast.open({message: 'error message', toastType: 'error'});

      expect(infoCalled).toBeTruthy();
      expect(warningCalled).toBeTruthy();
      expect(errorCalled).toBeTruthy();
    });

    it('should open info toast type when no or an unknown type is supplied', function () {
      let infoCalledCount: number = 0;
      fakeToastrService.info = () => {infoCalledCount++; return {} as ActiveToast;}

      toast.open({message: 'info message', toastType: undefined});
      toast.open({message: 'info message', toastType: 'NotAToastType'});

      expect(infoCalledCount).toBe(2);
    });

    it('should open error toast type when danger type is supplied', function () {
      let errorCalled: boolean = false;
      fakeToastrService.error = () => {errorCalled = true; return {} as ActiveToast;}

      toast.open({message: 'error message', toastType: 'danger'});
      expect(errorCalled).toBeTruthy();
    });
  });
});
