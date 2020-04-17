class Medicine {
  constructor(name) {
    this.name = name;
  }

  getMedicine() {
    const medicine = { name: 'Paracetamol', laboratorio: 'Baer' };

    if (this.name === medicine.name) {
      console.log('Medicine');
      return medicine;
    }
  }
}

export default Medicine;
