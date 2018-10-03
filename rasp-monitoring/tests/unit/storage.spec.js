import storage from '@/views/Storage.vue'

describe('Storage.vue', () => {
  it('carga Storage', () => {
    expect(typeof storage.created).toBe('function')
  });
});

describe('Storage.vue', () => {
  it('carga data de Storage', () => {
    expect(typeof storage.data).toBe('function')
  });
});
   
  
describe('Storage.vue', () => {
  it('Valor devuelto por data es un objeto', () => {
    const defaultData = storage.data();
    expect(typeof(defaultData)).toEqual('object')
  });
});

describe('Storage.vue', () => { 
  it('Existe key storage en el objeto data de storage', () => {
    const defaultData = storage.data();
    expect('storage' in defaultData).toEqual(true);
  });
});

// describe('Storage.vue', () => { 
//   it('La key storage es un array en el objeto data de storage', () => {
//     const defaultData = storage.data().storage;
//     console.log(defaultData)
//     expect(typeof(defaultData)).toEqual('array');
//   });
// });

describe('Storage.vue', () => { 
  it('Existe key maxTamanio en el objeto data de storage', () => {
    const defaultData = storage.data();
    expect('maxTamanio' in defaultData).toEqual(true);
  });
});


describe('Storage.vue', () => {
  it('Existe key Library en el objeto data de storage', () => {
    const defaultData = storage.data();
    expect('library' in defaultData).toEqual(true);
  });
});
  
describe('Storage.vue', () => {
  it('La key Library es un denntro de data de storage', () => {
    const library = storage.data().library;
    expect(typeof(library)).toEqual('object');
  });
});
  
describe('Storage.vue', () => {
  it('Existe key responsive dentro de Library en el objeto data de storage', () => {
   const library = storage.data().library;
    expect('responsive' in library).toEqual(true);
  });
});
  
describe('Storage.vue', () => {
  it('Existe key cutoutPercentaje dentro de Library en el objeto data de storage', () => {
   const library = storage.data().library;
    expect('cutoutPercentage' in library).toEqual(true);
  });
});
  
describe('Storage.vue', () => {
  it('La key pieceLabel es un objeto dentro de Library en el objeto data de storage', () => {
    const pieceLabel = storage.data().library.pieceLabel;
    expect(typeof(pieceLabel)).toEqual('object');
  });
});
  
describe('Storage.vue', () => {
  it('Existe la key mode en pieceLabel dentro de Library en el objeto data de storage', () => {
    const pieceLabel = storage.data().library.pieceLabel;
    expect('mode' in pieceLabel).toEqual(true);
  });
});
  
describe('Storage.vue', () => {
  it('La key mode en pieceLabel dentro de Library en el objeto data de storage es un valor de tipo string', () => {
    const pieceLabel = storage.data().library.pieceLabel;
    expect(typeof(pieceLabel.mode)).toEqual('string');
  });
});
    
describe('Storage.vue', () => {
  it('Existe la key fontColor en pieceLabel dentro de Library en el objeto data de storage', () => {
    const pieceLabel = storage.data().library.pieceLabel;
    expect('fontColor' in pieceLabel).toEqual(true);
  });
});
    
describe('Storage.vue', () => {
  it('La key fontColor en pieceLabel dentro de Library en el objeto data de storage es un valor de tipo string', () => {
    const pieceLabel = storage.data().library.pieceLabel;
    expect(typeof(pieceLabel.fontColor)).toEqual('string');
  });
});
  