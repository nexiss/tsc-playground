import {
  Camera,
  Machine,
  MachineType,
  Peripheral,
} from '../stepsBuilder/machine';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SharedSteps<U extends Omit<SharedSteps, 'setType'> = any> {
  setSharedAttribute: (sharedAttribute: string) => U;
  setType: <T extends MachineType>(
    machineType: T
  ) => typeof machineType extends 'mobile' ? MobileSteps : ComputerSteps;
  build: () => Machine;
}

interface MobileSteps extends Omit<SharedSteps<MobileSteps>, 'setType'> {
  setCamera: (camera: Camera) => MobileSteps;
}

interface ComputerSteps extends Omit<SharedSteps<ComputerSteps>, 'setType'> {
  setPeripherals: (peripherals: Peripheral[]) => ComputerSteps;
}

// ====================================

class MobileStepsBuilder implements MobileSteps {
  builder: MachineBuilder;
  machineType = 'mobile' as const;
  camera: Camera = 'camera1';

  constructor(builder: MachineBuilder) {
    this.builder = builder;
  }

  setSharedAttribute(sharedAttribute: string) {
    this.builder.setSharedAttribute(sharedAttribute);
    return this;
  }

  setCamera(camera: Camera) {
    this.camera = camera;
    return this;
  }

  build(): Machine {
    return {
      ...this.builder.build(),
      machineType: this.machineType,
      camera: this.camera,
    };
  }
}

// ====================================

class ComputerStepsBuilder implements ComputerSteps {
  builder: MachineBuilder;
  machineType = 'computer' as const;
  peripherals: Peripheral[] = [];

  constructor(builder: MachineBuilder) {
    this.builder = builder;
  }

  setSharedAttribute(sharedAttribute: string) {
    this.builder.setSharedAttribute(sharedAttribute);
    return this;
  }

  setPeripherals(peripherals: Peripheral[]) {
    this.peripherals = peripherals;
    return this;
  }

  build(): Machine {
    return {
      ...this.builder.build(),
      machineType: this.machineType,
      peripherals: this.peripherals,
    };
  }
}

// ====================================

class MachineBuilder implements SharedSteps<MachineBuilder> {
  protected sharedAttribute = '';

  setSharedAttribute(sharedAttribute: string) {
    this.sharedAttribute = sharedAttribute;
    return this;
  }

  setType<
    T extends MachineType,
    R = T extends 'mobile' ? MobileSteps : ComputerSteps,
  >(machineType: T): R {
    if (machineType === 'mobile') {
      return new MobileStepsBuilder(this) as R;
    } else {
      return new ComputerStepsBuilder(this) as R;
    }
  }

  build(): Machine {
    return {
      sharedAttribute: this.sharedAttribute,
    };
  }
}

export const getMachineBuilder = () => {
  return new MachineBuilder();
};
