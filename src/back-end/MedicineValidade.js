'use strict';
import express from 'express';
import moment from 'moment';

class MedicineValidade {
  constructor(name, laboratory, quantity, expirationDate) {
    this.name = name;
    this.laboratory = laboratory;
    this.quantity = quantity;
    this.expirationDate = expirationDate;
  }

  validadeName() {
    if (typeof this.name !== 'string') {
      return { message: 'O campo nome aceita somente letras.' };
    }
    if (!this.name) {
      return { message: 'O campo nome está vaziu.' };
    }
  }
  validadeLaboratory() {
    if (!this.laboratory) {
      return { message: `O campo laboratório está vazio.` };
    }
    if (typeof this.laboratory !== 'string') {
      return { message: 'O campo laboratorio aceita somente letras.' };
    }
  }
  validadeQuantity() {
    let result = Number.isInteger(this.quantity);
    if (!this.quantity) {
      return { message: `O campo quantidade está vazio.` };
    }
    if (this.quantity < 0) {
      return { message: 'O campo quantidade está com valor invalido.' };
    }
    if (!result) {
      return {
        message: 'O valor digitado no campo quantidade não é valido. ',
      };
    }
  }

  setExpirationDate(newExpirationDate) {
    return (this.expirationDate = newExpirationDate);
  }

  getExpirationDate() {
    return this.expirationDate;
  }

  validadeExpirationDate() {
    let newExpirationDate = moment(
      this.expirationDate,
      'DD-MM-YYYY',
      true
    ).format();

    console.log('>>>>>>>>>>>>> newExpirationDate: ', newExpirationDate);

    this.setExpirationDate(newExpirationDate);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.getExpirationDate());
    if (this.expirationDate === 'Invalid date') {
      express.json({
        message: 'O campo data está com o valor inválido.',
      });
    }
  }
}

export default MedicineValidade;
