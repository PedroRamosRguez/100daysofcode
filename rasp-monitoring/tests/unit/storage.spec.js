import storage from '@/views/Storage.vue'

describe('Storage.vue', () => {
  it('load Storage', () => {
    expect(typeof storage.created).toBe('function')
  });
});

describe('Storage.vue', () => {
  it('load data from Storage', () => {
    expect(typeof storage.data).toBe('function')
  });
});
   
  
describe('Storage.vue', () => {
  it('data return an object', () => {
    const defaultData = storage.data();
    expect(typeof(defaultData)).toEqual('object')
  });
});

describe('Storage.vue', () => { 
  it('The key storage exists in data object', () => {
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
  it('The key maxSize exists in data object', () => {
    const defaultData = storage.data();
    expect('maxSize' in defaultData).toEqual(true);
  });
});


describe('Storage.vue', () => {
  it('The key library exists in data object', () => {
    const defaultData = storage.data();
    expect('library' in defaultData).toEqual(true);
  });
});
  
describe('Storage.vue', () => {
  it('Library key is an object', () => {
    const library = storage.data().library;
    expect(typeof(library)).toEqual('object');
  });
});
  
describe('Storage.vue', () => {
  it('The key responsive exists in library object in data object', () => {
   const library = storage.data().library;
    expect('responsive' in library).toEqual(true);
  });
});
  
describe('Storage.vue', () => {
  it('The key cutoutPercentage exists in library object in data object', () => {
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
  it('The key mode exists in pieceLabel object in Library object in data object', () => {
    const pieceLabel = storage.data().library.pieceLabel;
    expect('mode' in pieceLabel).toEqual(true);
  });
});
  
describe('Storage.vue', () => {
  it('The key mode in pieceLabel object is a string', () => {
    const pieceLabel = storage.data().library.pieceLabel;
    expect(typeof(pieceLabel.mode)).toEqual('string');
  });
});
    
describe('Storage.vue', () => {
  it('The key fontColor exists in pieceLabel object in Library object in data object', () => {
    const pieceLabel = storage.data().library.pieceLabel;
    expect('fontColor' in pieceLabel).toEqual(true);
  });
});
    
describe('Storage.vue', () => {
  it('The key fontColor in pieceLabel object is a string', () => {
    const pieceLabel = storage.data().library.pieceLabel;
    expect(typeof(pieceLabel.fontColor)).toEqual('string');
  });
});
  