export function widgets(state: any = [], { type, payload }) {
  switch (type) {
    case LOAD_WIDGETS:
      return payload;
    case CREATE_WIDGET:
      return [...state, payload];
    case UPDATE_WIDGET:
      return state.map(item => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
    case DELETE_WIDGET:
      return state.filter(item => {
        return item.id !== payload.id;
      });
    default:
      return state;
  }
}
const LOAD_WIDGETS = 'LOAD_WIDGETS';
const CREATE_WIDGET = 'CREATE_WIDGET';
const UPDATE_WIDGET = 'UPDATE_WIDGET';
const DELETE_WIDGET = 'DELETE_WIDGET';
