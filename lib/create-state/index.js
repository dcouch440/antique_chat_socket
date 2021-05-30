const createState = () => {
  let currentState = {};

  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };

};

module.exports = createState;