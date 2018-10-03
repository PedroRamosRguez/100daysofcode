import temperature from '@/views/Temperature.vue'

describe('Temperature.vue', () => {
  it('carga Temperature', () => {
    expect(typeof temperature.created).toBe('function')
  });
});

describe('Temperature.vue', () => {
  it('carga data de Temperature', () => {
    expect(typeof temperature.data).toBe('function')
  });
});
     
describe('Temperature.vue', () => {
  it('Valor devuelto por data es un objeto', () => {
    const defaultData = temperature.data();
    expect(typeof(defaultData)).toEqual('object')
  });
});
  
describe('Temperature.vue', () => { 
  it('Existe key temperaturaCpu en el objeto data de temperature', () => {
    const defaultData = temperature.data();
    expect('temperaturaCpu' in defaultData).toEqual(true);
  });
});

describe('Temperature.vue', () => { 
  it('Existe key temperaturaGpu en el objeto data de temperature', () => {
    const defaultData = temperature.data();
    expect('temperaturaGpu' in defaultData).toEqual(true);
  });
});
