import Medicine from '../back-end/Medicine';

describe('Medicamentos', () => {
  test('buscar remedio', () => {
    const testeMedicine = {
      name: 'Paracetamol',
      laboratorio: 'Baer',
    };

    const medicine = new Medicine('Paracetamol');

    expect(medicine.getMedicine()).toEqual(testeMedicine);
  });
});
