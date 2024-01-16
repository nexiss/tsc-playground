import { getMachineBuilder, getSpecificMachineBuilder } from '../builder-fn';
import { MachineType } from '../machine';

describe('Builder function', () => {
  describe('Machine builder', () => {
    describe('mobile', () => {
      it('should build all properties informed', () => {
        const mobile = getMachineBuilder()
          .setType('mobile')
          .setCamera('camera1')
          .setSharedAttribute('anyString')
          .build();

        expect(mobile).toStrictEqual({
          machineType: 'mobile',
          camera: 'camera1',
          sharedAttribute: 'anyString',
        });
      });

      it('should build only properties informed', () => {
        const mobile = getMachineBuilder().setType('mobile').build();

        expect(mobile).toStrictEqual({
          machineType: 'mobile',
        });
      });
    });

    describe('computer', () => {
      it('should build all properties informed', () => {
        const computer = getMachineBuilder()
          .setType('computer')
          .setPeripherals(['peripheral1'])
          .setSharedAttribute('anyString')
          .build();

        expect(computer).toStrictEqual({
          machineType: 'computer',
          peripherals: ['peripheral1'],
          sharedAttribute: 'anyString',
        });
      });

      it('should build only properties informed', () => {
        const computer = getMachineBuilder().setType('computer').build();

        expect(computer).toStrictEqual({
          machineType: 'computer',
          peripherals: [],
        });
      });
    });
  });

  describe('Specific machine builder', () => {
    it.each`
      type
      ${'mobile'}
      ${'computer'}
    `(
      'should build the machine according to the provided type ($type)',
      ({ type }: { type: MachineType }) => {
        const machine = getSpecificMachineBuilder({
          type,
        }).build();

        expect(machine).toStrictEqual(
          expect.objectContaining({
            machineType: type,
          })
        );
      }
    );
  });
});
