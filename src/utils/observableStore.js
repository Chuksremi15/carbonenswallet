const CustomersStoreActions = {
  GetCustomers: "GET_CUSTOMERS",
  GetCustomer: "GET_CUSTOMER",
};

export class WalletStore extends ObservableStore {
  constructor() {
    super({ trackStateHistory: true });
  }

  tempStorePassword(password) {
    this.setState({ password }, "SAVE_PASSWORD");
  }

  fetchCustomers() {
    // using fetch api here to keep it simple, but any other
    // 3rd party option will work (Axios, Ky, etc.)
    return fetch("/customers")
      .then((response) => response.json())
      .then((customers) => {
        this.setState({ customers }, "GET_CUSTOMERS");
        return customers;
      });
  }

  getCustomers() {
    let state = this.getState();
    // pull from store cache
    if (state && state.customers) {
      return this.createPromise(null, state.customers);
    }
    // doesn't exist in store so fetch from server
    else {
      return this.fetchCustomers();
    }
  }

  getCustomer(id) {
    return this.getCustomers().then((custs) => {
      let filteredCusts = custs.filter((cust) => cust.id === id);
      const customer =
        filteredCusts && filteredCusts.length ? filteredCusts[0] : null;
      this.setState({ customer }, "GET_CUSTOMER");
      return customer;
    });
  }

  createPromise(err, result) {
    return new Promise((resolve, reject) => {
      return err ? reject(err) : resolve(result);
    });
  }
}

export default new WalletStore();
