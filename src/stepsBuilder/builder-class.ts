import { Camera, Machine, MachineType, Peripheral } from './machine';

interface Builder<T> {
  build: () => T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SharedSteps<U extends Omit<SharedSteps, 'setType'> = any> {
  setSharedAttribute: (sharedAttribute: string) => U;
  setType: <T extends MachineType>(
    machineType: T
  ) => typeof machineType extends 'mobile' ? MobileSteps : ComputerSteps;
}

interface MobileSteps
  extends Omit<SharedSteps<MobileSteps>, 'setType'>,
    Builder<Machine> {
  setCamera: (camera: Camera) => MobileSteps;
}

interface ComputerSteps
  extends Omit<SharedSteps<ComputerSteps>, 'setType'>,
    Builder<Machine> {
  setPeripherals: (peripherals: Peripheral[]) => ComputerSteps;
}

// ====================================

class MachineBuilder implements SharedSteps<MachineBuilder> {
  protected sharedAttribute = undefined;

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
    return Object.assign(
      {},
      this.sharedAttribute && { sharedAttribute: this.sharedAttribute }
    );
  }
}

// ====================================

class MobileStepsBuilder implements MobileSteps {
  builder: MachineBuilder;
  machineType = 'mobile' as const;
  camera: Camera = undefined;

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
    return Object.assign(
      { ...this.builder.build() },
      this.machineType && { machineType: this.machineType },
      this.camera && { camera: this.camera }
    );
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
    return Object.assign(
      { ...this.builder.build() },
      this.machineType && { machineType: this.machineType },
      this.peripherals && { peripherals: this.peripherals }
    );
  }
}

export const getMachineBuilder = () => {
  return new MachineBuilder();
};

type MachineFactoryProps =
  | {
      type: 'mobile';
      camera?: Camera;
    }
  | {
      type: 'computer';
      peripherals?: Peripheral[];
    };

export const getSpecificMachineBuilder = <
  T extends MachineFactoryProps,
  U = T['type'] extends 'mobile' ? MobileSteps : ComputerSteps,
>(
  props: T
): U => getMachineBuilder().setType(props.type);
