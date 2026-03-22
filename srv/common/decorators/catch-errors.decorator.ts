import { logDecoratorError } from '../helpers/log-decorator-error';

export function CatchErrors() {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<any> {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        const message = `Error in ${this.constructor.name}.${originalMethod.name}`;
        logDecoratorError(this, message, error);
      }
    };

    return descriptor;
  };
}
