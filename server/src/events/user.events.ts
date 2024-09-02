import EventEmitter from "events";
import { UserT } from "../db/models.js";

// abstract class Emitter {
//   abstract on(...args: any[]): void;
//   abstract emit(...args: any[]): void;
// }

class CustomEmmiter<T> {
  eventName: string;
  mainEmitter: EventEmitter;

  constructor(eventName: string) {
    this.eventName = eventName;
  }

  on: (data: (typeof this.onEmit.arguments)[0]) => void;
  onEmit: (data: (typeof this.on.arguments)[0]) => void;

  // setupOnFunc<T extends (typeof this.on.arguments)[0]>(func: T): void {}
  emit() {
    const onArgs = this.on.arguments;
    const onEmitArgs = this.onEmit.arguments;
    if (!(JSON.stringify(onArgs) === JSON.stringify(onEmitArgs)))
      throw "not implemented";
  }
  addMainEmitter(emitter: EventEmitter) {
    this.mainEmitter = emitter;
  }
}

class EmitterService extends EventEmitter {
  constructor() {
    super();
  }

  addEmitters<T>(emitters: CustomEmmiter<unknown>[]): void {
    emitters.forEach((emitter) => {
      this.on(emitter.eventName, emitter.on);
      emitter.addMainEmitter(this);
    });
  }
}

export const emitter = new EmitterService();
export const balaneUpdated = new CustomEmmiter("balancerUpdated");

balaneUpdated.on = (users: UserT[]) => {};
// let l:keyof balaneUpdated.on
balaneUpdated.onEmit = (users) => {};
balaneUpdated.emit();
