export class Logger {
  private verbose: boolean;

  constructor(verbose = false) {
    this.verbose = verbose;
  }

  info(message: string, ...args: any[]) {
    console.log(`[INFO] ${message}`, ...args);
  }

  debug(message: string, ...args: any[]) {
    if (this.verbose) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]) {
    console.error(`[ERROR] ${message}`, ...args);
  }

  warn(message: string, ...args: any[]) {
    console.warn(`[WARN] ${message}`, ...args);
  }
}