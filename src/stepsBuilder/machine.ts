export type MachineType = 'mobile' | 'computer';

export type Camera = 'camera1' | 'camera2';

export type Peripheral = 'peripheral1' | 'peripheral2' | 'peripheral3';

export type Machine = {
  sharedAttribute: string;
} & (
  | object
  | {
      machineType: 'mobile';
      camera: Camera;
    }
  | { machineType: 'computer'; peripherals: Peripheral[] }
);
