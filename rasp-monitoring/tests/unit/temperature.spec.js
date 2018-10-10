import temperature from '@/views/Temperature.vue'

describe('Temperature.vue', () => {
  it('loadTemperature', () => {
    expect(typeof temperature.created).toBe('function')
  });
});

describe('Temperature.vue', () => {
  it('load data from Temperature', () => {
    expect(typeof temperature.data).toBe('function')
  });
});
     
describe('Temperature.vue', () => {
  it('data return an object', () => {
    const defaultData = temperature.data();
    expect(typeof(defaultData)).toEqual('object')
  });
});
  
describe('Temperature.vue', () => { 
  it('The key cpuTemperature exists in data object', () => {
    const defaultData = temperature.data();
    expect('cpuTemperature' in defaultData).toEqual(true);
  });
});

describe('Temperature.vue', () => { 
  it('The key cpuTemperature exists in data object', () => {
    const defaultData = temperature.data();
    expect('gpuTemperature' in defaultData).toEqual(true);
  });
});
