import { getMachineBuilder, getSpecificMachineBuilder } from './builder-fn';

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

getSpecificMachineBuilder({ type: 'mobile' })
  .setSharedAttribute('anything')
  .build();
getSpecificMachineBuilder({ type: 'mobile', camera: 'camera1' }).build();
getSpecificMachineBuilder({ type: 'mobile', camera: 'camera1' })
  .setCamera('camera2')
  .build();
getSpecificMachineBuilder({ type: 'computer' })
  .setSharedAttribute('anything')
  .build();
getSpecificMachineBuilder({ type: 'computer', peripherals: [] }).build();
getSpecificMachineBuilder({ type: 'computer', peripherals: [] })
  .setPeripherals(['peripheral1'])
  .build();

// This should be complaining, as camera is not a part of the computer, but one of the mobile
getSpecificMachineBuilder({ type: 'computer', camera: '' });
