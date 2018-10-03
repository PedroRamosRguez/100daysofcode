//import { shallowMount } from '@vue/test-utils'
import cpu from '@/views/Cpu.vue'

describe('Cpu.vue', () => {
  it('carga CPU', () => {
    expect(typeof cpu.created).toBe('function');
  });
});

describe('Cpu.vue', () => {
  it('Carga data de CPU', () => {
    expect(typeof cpu.data).toBe('function');
  });
});

describe('Cpu.vue', () => {
  it('Valor devuelto por data es un objeto', () => {
    const defaultData = cpu.data();
    expect(typeof(defaultData)).toEqual('object')
  });
});


describe('Cpu.vue', () => {
  it('Uso Cpu en data está vacío', () => {
    const defaultData = cpu.data();
    expect(defaultData.usoCpu).toEqual([]);
  });
});

describe('Cpu.vue', () => {
  it('Añadiendo valores de fecha a usoCpu de data ', () => {
    expect(typeof cpu.data).toBe('function');
    const defaultData = cpu.data();
    defaultData.usoCpu.push('Tue Oct 02 2018 18:35:21 GMT+0100 (hora de verano de Europa occidental)', 3.4);
    expect(defaultData.usoCpu[0]).toEqual('Tue Oct 02 2018 18:35:21 GMT+0100 (hora de verano de Europa occidental)');
  });
});

describe('Cpu.vue', () => {
  it('Añadiendo valores de flotantes a usoCpu', () => {
    const defaultData = cpu.data();
    defaultData.usoCpu.push('Tue Oct 02 2018 18:35:21 GMT+0100 (hora de verano de Europa occidental)', 3.4);
    expect(defaultData.usoCpu[1]).toEqual(3.4);
  });
});
