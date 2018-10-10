//import { shallowMount } from '@vue/test-utils'
import cpu from '@/views/Cpu.vue'

describe('Cpu.vue', () => {
  it('load CPU', () => {
    expect(typeof cpu.created).toBe('function');
  });
});

describe('Cpu.vue', () => {
  it('load data from CPU', () => {
    expect(typeof cpu.data).toBe('function');
  });
});

describe('Cpu.vue', () => {
  it('data return an object', () => {
    const defaultData = cpu.data();
    expect(typeof(defaultData)).toEqual('object')
  });
});


describe('Cpu.vue', () => {
  it('CpuUse is empty', () => {
    const defaultData = cpu.data();
    expect(defaultData.cpuUse).toEqual([]);
  });
});

describe('Cpu.vue', () => {
  it('Adding date time value to cpuUse', () => {
    expect(typeof cpu.data).toBe('function');
    const defaultData = cpu.data();
    defaultData.cpuUse.push('Tue Oct 02 2018 18:35:21 GMT+0100 (hora de verano de Europa occidental)', 3.4);
    expect(defaultData.cpuUse[0]).toEqual('Tue Oct 02 2018 18:35:21 GMT+0100 (hora de verano de Europa occidental)');
  });
});

describe('Cpu.vue', () => {
  it('Adding float values to cpuUse', () => {
    const defaultData = cpu.data();
    defaultData.cpuUse.push('Tue Oct 02 2018 18:35:21 GMT+0100 (hora de verano de Europa occidental)', 3.4);
    expect(defaultData.cpuUse[1]).toEqual(3.4);
  });
});
