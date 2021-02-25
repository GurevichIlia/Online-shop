import { Type } from '@angular/core';
import { environment } from 'src/environments/environment';
export class Logger {

  static log<T>(message?: any, object?: any, context?: Type<T>): void {
    if (!environment.production) {
      console.log(`Log in ${context?.name}: ${message}`, object)
    }
  }

  // static storeLog<StoreInterface, Component>(
  //   oldStoreState: StoreInterface,
  //   newStoreState: StoreInterface,
  //   updatedProperty: keyof StoreInterface,
  //   context: Type<Component>
  // ): void {
  //   const updatedInfo = {
  //     oldStoreState: oldStoreState,
  //     newStoreState: newStoreState,
  //     updatedPropertyOldState: oldStoreState[updatedProperty],
  //     updatedPropertyNewState: newStoreState[updatedProperty]
  //   }

  //   console.log(`Updated state in ${context.name}:`, updatedInfo)
  // }
}
