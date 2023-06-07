import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFormState {
  id?: number;
  nameTitle?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  nationality?: string;
  numberOfDependents?: string;
  sex?: string;
  telephoneNumber?: string;
  travelBookingNumber?: string;
  salary?: string;
}

interface IFormSliceState {
  form: IFormState;
  tableData: IFormState[];
}

const initialState: IFormSliceState = {
  form: {
    nameTitle: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    numberOfDependents: "",
    sex: "",
    telephoneNumber: "",
    travelBookingNumber: "",
    salary: "",
  },
  tableData: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<IFormState>) => {
      state.form = { ...state.form, ...action.payload };
    },
    clearForm: (state) => {
      state.form = initialState.form;
    },
    addTableData: (state, action: PayloadAction<IFormState>) => {
      const id = Math.floor(Math.random() * 1000000000);
      const newEntry: IFormState = {
        ...action.payload,
        id,
      };
      state.tableData.push(newEntry);
    },
    deleteTableDataById: (state, action: PayloadAction<{ id: number[] }>) => {
      state.tableData = state.tableData.filter(
        (item) => !action.payload.id.includes(item.id as number)
      );
    },
  },
});

export const { setForm, addTableData, deleteTableDataById, clearForm } =
  formSlice.actions;
export const formReducer = formSlice.reducer;
