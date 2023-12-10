import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;

    super.log(context, message);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`;

    super.error(message, stackOrContext);
  }
}
