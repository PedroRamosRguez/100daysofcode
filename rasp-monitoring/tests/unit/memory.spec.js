import memory from '@/views/Memory.vue'

describe('Memory.vue', () => {
  it('load Memory', () => {
    expect(typeof memory.created).toBe('function')
  });
});


describe('Memory.vue', () => {
  it('load data fromMemory', () => {
    expect(typeof memory.data).toBe('function')
  });
});
 

describe('Memory.vue', () => {
  it('data return an object', () => {
    const defaultData = memory.data();
    expect(typeof(defaultData)).toEqual('object')
  });
});

describe('Memory.vue', () => {
  it('The key memTotal exists in data object', () => {
    const defaultData = memory.data();
    expect('memTotal' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('The key freeMem exists in data object', () => {
    const defaultData = memory.data();
    expect('memFree' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('The key usedMem exists in data object', () => {
    const defaultData = memory.data();
    expect('memUsed' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('The key percentajeFreeMem exists in data object', () => {
    const defaultData = memory.data();
    expect('percentageMemFree' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('The key percentajeUsedMem exists in data object', () => {
    const defaultData = memory.data();
    expect('percentageMemUsed' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('The key library exists in data object', () => {
    const defaultData = memory.data();
    expect('library' in defaultData).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('Library key is an object', () => {
    const library = memory.data().library;
    expect(typeof(library)).toEqual('object');
  });
});

describe('Memory.vue', () => {
  it('The key responsive exists in library object in data object', () => {
    const library = memory.data().library;
    expect('responsive' in library).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('The key cutoutPercentage exists in library object in data object', () => {
    const library = memory.data().library;
    expect('cutoutPercentage' in library).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('The key pieceLabel exists in library object in data object', () => {
    const pieceLabel = memory.data().library.pieceLabel;
    expect(typeof(pieceLabel)).toEqual('object');
  });
});

describe('Memory.vue', () => {
  it('The key mode exists in pieceLabel object in Library object in data object', () => {
    const pieceLabel = memory.data().library.pieceLabel;
    expect('mode' in pieceLabel).toEqual(true);
  });
});

describe('Memory.vue', () => {
  it('The key mode in pieceLabel object is a string', () => {
    const pieceLabel = memory.data().library.pieceLabel;
    expect(typeof(pieceLabel.mode)).toEqual('string');
  });
});
  

describe('Memory.vue', () => {
  it('The key fontColor exists in pieceLabel object in Library object in data object', () => {
    const pieceLabel = memory.data().library.pieceLabel;
    expect('fontColor' in pieceLabel).toEqual(true);
  });
});
  
describe('Memory.vue', () => {
  it('The key fontColor in pieceLabel object is a string', () => {
    const pieceLabel = memory.data().library.pieceLabel;
    expect(typeof(pieceLabel.fontColor)).toEqual('string');
  });
});
