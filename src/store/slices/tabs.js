import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // pin: [],
  content: {},
  colorPin: [],
  countryPin: [],
  tab: "Aluminum",
};
const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    updateTab: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    addColorPin: (state, action) => {
      if (
        state.colorPin.some((item) =>
          item?.name?.includes(action.payload?.name)
        )
      ) {
        state.colorPin = state.colorPin.filter(
          (item) => item?.name !== action.payload?.name
        );
        return state;
      }
      if (state.colorPin.length > 2) {
        return state;
      }
      state.colorPin.push(action.payload);
    },

    addContent: (state, action) => {
      state.content = action.payload;
    },

    addCountryPin: (state, action) => {
      state.countryPin = action.payload;
    },
    removeColorPin: (state, action) => {
      state.colorPin = state.colorPin.filter(
        (item) => item?.name !== action.payload?.name
      );
    },
  },
});
export const {
  addPin,
  removePin,
  updateTab,
  addContent,
  addColorPin,
  removeColorPin,
  addCountryPin,
} = tabsSlice.actions;
export default tabsSlice;

// addCountryPin: (state, action) => {
//   if (
//     state.countryPin.some((item) =>
//       item?.name?.includes(action.payload?.name)
//     )
//   ) {
//     state.countryPin = state.countryPin.filter(
//       (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
//     );
//     return state;
//   }
//   if (state.countryPin?.length > 2) {
//     return state;
//   }
//   state.countryPin.push(action.payload);
// },
// addPin: (state, action) => {
//   if (state.pin.includes(action.payload)) {
//     state.pin = state.pin.filter((item) => item !== action.payload);
//     return state;
//   }
//   if (state.pin.length > 2) {
//     return state;
//   }
//   state.pin.push(action.payload);
// },
// removePin: (state, action) => {
//   state.pin = state.pin.filter((item) => item !== action.payload);
// },
// removeCountryPin: (state, action) => {
//   state.countryPin = state.countryPin.filter(
//     (item) => item?.name !== action.payload?.name
//   );
// },
