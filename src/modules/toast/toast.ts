
export interface ToastOptions {
  message?: string;
  templateUrl?: string;
  toastType?: string;
  timeOut?: number | string;
  resolve?: object;
}
export interface ToastConfiguration {
  iconClass?: string;
  timeOut?: number;
  extendedTimeOut?: number;
}

export class SkyToast {
  constructor() {
  }

  public validateOptions(opts: ToastOptions) {
    if (opts.message && opts.templateUrl) {
      throw 'You must not provide both a message and a templateUrl.';
    }
    else if (!opts.message && !opts.templateUrl) {
      throw 'You must provide either a message or a templateUrl.';
    }

    switch (opts.toastType) {
      case 'info':
      case 'warning':
      case 'error':
        break;
      case 'danger':
        opts.toastType = 'error';
      default:
        opts.toastType = 'info';
    }
  }

  public open(message: string, config: ToastConfiguration = {}, opts: ToastOptions) {
    opts.message = message;
    this.validateOptions(opts);
    config.iconClass = 'bb-toast-' + opts.toastType;

    switch (opts.timeOut) {
      case 'infinite':
        config.timeOut = config.extendedTimeOut = 0;
        break;
      default:
        if (typeof opts.timeOut !== 'number') {
          config.timeOut = config.extendedTimeOut = +opts.timeOut;
        }
    }
    return toastr[opts.toastType](message, '', config);
  }

  public openMessage(opts: ToastOptions) {
    return this.open(opts.message, null, opts);
  }

  public openWithTemplate(opts: ToastOptions) {
  }
}
