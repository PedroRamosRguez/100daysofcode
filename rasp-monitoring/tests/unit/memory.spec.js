import memory from '@/views/Memory.vue'

describe('Memory.vue', () => {
  it('carga Memory', () => {
    expect(typeof memory.created).toBe('function')
  });
});


describe('Memory.vue', () => {
  it('carga data de Memory', () => {
    expect(typeof memory.data).toBe('function')
  });
});
 

describe('Memory.vue', () => {
  it('Valor devuelto por data es un objeto', () => {
    const defaultData = memory.data();
    expect(typeof(defaultData)).toEqual('object')
  });
});

describe('Memory.vue', () => {
  it('Existe key memTotal en el objeto data de memory', () => {
    const defaultData = memory.data();
    expect('memTotal' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('Existe key memLibre en el objeto data de memory', () => {
    const defaultData = memory.data();
    expect('memLibre' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('Existe key memUsada en el objeto data de memory', () => {
    const defaultData = memory.data();
    expect('memUsada' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('Existe key porcentajeMemLibre en el objeto data de memory', () => {
    const defaultData = memory.data();
    expect('porcentajeMemLibre' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('Existe key porcentajeMemUsada en el objeto data de memory', () => {
    const defaultData = memory.data();
    expect('porcentajeMemUsada' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('Existe key Library en el objeto data de memory', () => {
    const defaultData = memory.data();
    expect('library' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('La key Library es un denntro de data de memory', () => {
    const library = memory.data().library;
    expect(typeof(library)).toEqual('object');
  });
});

describe('Memory.vue', () => {
  it('Existe key responsive dentro de Library en el objeto data de memory', () => {
    const library = memory.data().library;
    expect('responsive' in library).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('Existe key cutoutPercentaje dentro de Library en el objeto data de memory', () => {
    const library = memory.data().library;
    expect('cutoutPercentage' in library).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('La key pieceLabel es un objeto dentro de Library en el objeto data de memory', () => {
    const pieceLabel = memory.data().library.pieceLabel;
    expect(typeof(pieceLabel)).toEqual('object');
  });
});

describe('Memory.vue', () => {
  it('Existe la key mode en pieceLabel dentro de Library en el objeto data de memory', () => {
    const pieceLabel = memory.data().library.pieceLabel;
    expect('mode' in pieceLabel).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('La key mode en pieceLabel dentro de Library en el objeto data de memory es un valor de tipo string', () => {
    const pieceLabel = memory.data().library.pieceLabel;
    expect(typeof(pieceLabel.mode)).toEqual('string');
  });
});
  

describe('Memory.vue', () => {
  it('Existe la key fontColor en pieceLabel dentro de Library en el objeto data de memory', () => {
    const pieceLabel = memory.data().library.pieceLabel;
    expect('fontColor' in pieceLabel).toEqual(true);
  });
});
  
describe('Memory.vue', () => {
  it('La key fontColor en pieceLabel dentro de Library en el objeto data de memory es un valor de tipo string', () => {
    const pieceLabel = memory.data().library.pieceLabel;
    expect(typeof(pieceLabel.fontColor)).toEqual('string');
  });
});
