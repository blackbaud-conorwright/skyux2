import { ToastrService, IndividualConfig, ComponentType } from 'ngx-toastr';

export interface ToastOptions {
  message?: string;
  customComponentType?: ComponentType<any>;
  toastType?: string;
  timeOut?: number;
  extendedTimeOut?: number;
  disableTimeout?: boolean;
}

export class SkyToast {
  constructor(private toastr: ToastrService) {
  }

  private validateOptions(opts: ToastOptions): ToastOptions {
    if (opts.message && opts.customComponentType) {
      throw 'You must not provide both a message and a customComponentType.';
    } else if (!opts.message && !opts.customComponentType) {
      throw 'You must provide either a message or a customComponentType.';
    }

    switch (opts.toastType) {
      case 'info':
      case 'warning':
      case 'error':
        break;
      case 'danger':
        opts.toastType = 'error';
        break;
      default:
        opts.toastType = 'info';
        break;
    }
    return opts;
  }

  public open(opts: ToastOptions) {
    opts = this.validateOptions(opts);
    let config: Partial<IndividualConfig> = {
      toastClass: 'sky-toast-' + opts.toastType,
      timeOut: opts.disableTimeout ? 0 : opts.timeOut,
      extendedTimeOut: opts.disableTimeout ? 0 : opts.extendedTimeOut,
      toastComponent: opts.customComponentType
    };

    return (this.toastr as any)[opts.toastType](opts.message, undefined, config);
  }

  public openMessage(message: string, opts: ToastOptions) {
    opts.message = message;
    opts.customComponentType = undefined;
    return this.open(opts);
  }

  public openCustom(componentType: ComponentType<any>, opts: ToastOptions) {
    opts.customComponentType = componentType;
    opts.message = undefined;
    return this.open(opts);
  }
}
