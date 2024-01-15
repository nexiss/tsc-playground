import { getMachineBuilder } from './builder';

const mobile = getMachineBuilder()
  .setSharedAttribute('')
  .setType('mobile')
  .setCamera('camera2')
  .build();
const mobile2 = getMachineBuilder()
  .setType('mobile')
  .setCamera('camera2')
  .setSharedAttribute('')
  .build();
const computer = getMachineBuilder()
  .setSharedAttribute('')
  .setType('computer')
  .setPeripherals(['peripheral2'])
  .build();
const computer2 = getMachineBuilder()
  .setType('computer')
  .setPeripherals(['peripheral2'])
  .setSharedAttribute('')
  .build();

const imposibleMachine = getMachineBuilder()
  .setType('mobile')
  .setCamera('camera2')
  .setPeripherals(['peripheral2'])
  .build();
const imposibleMachine2 = getMachineBuilder()
  .setType('computer')
  .setPeripherals(['peripheral2'])
  .setCamera('camera2')
  .setSharedAttribute('')
  .build();
