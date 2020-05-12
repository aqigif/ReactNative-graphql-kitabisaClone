
  const delimiterNumber = (value) => {
    const number = value.toString()
    if (number) {
      let splitNumber = number.split('.');
      let valueNumber = splitNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      valueNumber = `${valueNumber}${splitNumber[1] ? ','+splitNumber[1] : ''}`;
      return valueNumber;
    }
    return value;
  }
  
  export default delimiterNumber