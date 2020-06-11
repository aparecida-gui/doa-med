import React from 'react';
import axios from 'axios';
import moment from 'moment';
class SearchMedicine extends React.Component {
  state = { search_medicine: '', medicines: [], message: '' };

  handleChange = (event) => {
    this.setState({ search_medicine: event.target.value });
  };

  handleSubmit = async () => {
    const search = this.state.search_medicine;

    let medicine = await axios.get(`http://localhost:7009/medicine/${search}`);

    if (medicine.data.message) {
      this.setState({ message: medicine.data.message });
    } else {
      this.setState({ medicines: medicine.data.medicine });
    }
  };

  render() {
    return (
      <div className="center">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="search-medicine">Nome do medicamento</label>
            <input
              value={this.state.search_medicine}
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="search-medicine"
              aria-describedby="emailHelp"
              placeholder="Qual o nome do medicamento?"
            />
          </div>
          {this.state.search_medicine.length > 0 && (
            <button
              onClick={this.handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Pesquisar
            </button>
          )}
        </form>

        <div>
          {this.state.medicines.length > 0 && (
            <div>
              <h4>Medicamentos Disponiveis para Doação</h4>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Medicamento</th>
                    <th>Data de Validade</th>
                    <th>Quantidade</th>
                    <th>Laboratório</th>
                  </tr>
                </thead>
                {this.state.medicines.map((medicine) => (
                  <tbody key={medicine.id}>
                    <tr>
                      <th>{medicine.name}</th>
                      <th>
                        {moment(medicine.expirationDate).format('DD/MM/YYYY')}
                      </th>
                      <th>{medicine.quantity}</th>
                      <th>{medicine.laboratory}</th>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
          <div className="text-center text-primary px-5">
            {this.state.message.length > 0 && <h4>{this.state.message}</h4>}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchMedicine;
