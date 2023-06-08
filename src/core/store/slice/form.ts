import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// form dayjs type
export interface IFormState {
  id?: number;
  nameTitle?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: any;
  nationality?: string;
  idCardNumber?: string;
  sex?: string;
  mobileNumber?: string;
  passportId?: string;
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
    idCardNumber: "",
    sex: "",
    mobileNumber: "",
    passportId: "",
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
    addOrEditTableData: (state, action: PayloadAction<IFormState>) => {
      if (action.payload.id) {
        const index = state.tableData.findIndex(
          (item) => item.id === action.payload.id
        );
        state.tableData[index] = action.payload;
      } else {
        const id = Math.floor(Math.random() * 1000000000);
        const newEntry: IFormState = {
          ...action.payload,
          id,
        };
        state.tableData.push(newEntry);
      }
    },
    getTableDataForEdit: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.tableData.findIndex(
        (item) => item.id === action.payload.id
      );
      state.form = state.tableData[index];
    },
    deleteTableDataById: (state, action: PayloadAction<{ id: number[] }>) => {
      state.tableData = state.tableData.filter(
        (item) => !action.payload.id.includes(item.id as number)
      );
    },
  },
});

export const {
  setForm,
  addOrEditTableData,
  getTableDataForEdit,
  deleteTableDataById,
  clearForm,
} = formSlice.actions;
export const formReducer = formSlice.reducer;
