import { performance } from 'perf_hooks';
import { logger } from './logger';

export function ControllerLogger() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (this: any, ...args: any) {
      try {
        const t1 = performance.now();
        await originalMethod.apply(this, args);
        const t2 = performance.now();
        const executionTime = t2 - t1;
        logger.debug(
          `[${propertyKey}] It took ${executionTime.toFixed(2)}ms to execute`
        );
      } catch (err: any) {
        throw err;
      }
    };
    return descriptor;
  };
}
