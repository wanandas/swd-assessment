import { useTranslation } from "react-i18next";
import { LayoutMain } from "../components/templates";
import { Space, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../core/store/store";
import {
  IFormState,
  addOrEditTableData,
  clearForm,
  deleteTableDataById,
  getTableDataForEdit,
  setForm,
} from "../core/store/slice/form";
import { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { FormItems } from "../components/Organisms";
import styled from "@emotion/styled";
import TableCustom from "../components/Organisms/TebleCutom/TableCustom";

const Test2 = () => {
  const { t } = useTranslation();

  const { dateOfBirth, idCardNumber, ...formInit } = useSelector(
    (state: RootState) => state.form
  );
  const tableData = useSelector((state: RootState) => state.tableData);

  const dispatch = useDispatch();
  const [form] = Form.useForm<IFormState>();

  // form
  const changeValueForm = (v: IFormState) => {
    if (v.dateOfBirth) {
      dispatch(setForm({ dateOfBirth: v.dateOfBirth.format("DD/MM/YYYY") }));
    } else {
      dispatch(setForm(v));
    }
  };
  const onFinish = async (v: IFormState) => {
    await dispatch(
      addOrEditTableData({ ...v, id: formInit?.id, idCardNumber })
    );
    await dispatch(clearForm());
    form.resetFields();
  };

  // table
  const onGetTableDataForEdit = useCallback(
    async (id: string | number) => {
      await dispatch(getTableDataForEdit({ id: Number(id) }));
      form.resetFields();
    },
    [dispatch, form]
  );

  const onDeleteTableData = useCallback(
    async (id: number[]) => {
      await dispatch(deleteTableDataById({ id }));
    },
    [dispatch]
  );

  const dateOfBirthMemo = useMemo(() => {
    if (dateOfBirth && dateOfBirth.length === 10) {
      return dayjs(dateOfBirth, "DD/MM/YYYY");
    }
    if (dateOfBirth) {
      return dayjs(dateOfBirth);
    }
    return null;
  }, [dateOfBirth]);

  return (
    <LayoutMain>
      <h1>{t("common.test-2")}</h1>
      <FormWrapper>
        <Form
          layout="vertical"
          autoComplete="off"
          initialValues={{
            ...formInit,
            idCardNumber,
            dateOfBirth: dateOfBirthMemo,
          }}
          form={form}
          onValuesChange={changeValueForm}
          onFinish={onFinish}
        >
          <FormItems form={form} />
        </Form>
      </FormWrapper>
      <TableCustom
        onEdit={onGetTableDataForEdit}
        onDelete={onDeleteTableData}
        data={tableData}
      />
    </LayoutMain>
  );
};

const FormWrapper = styled(Space)`
  border: 1px solid #000;
  background-color: #fff;
  padding: 1rem;
  margin: 0 auto;
  border-radius: 8px;
  margin-bottom: 1rem;
  & > h1 {
    text-align: center;
  }
  label {
    font-weight: bold;
  }
`;

export default Test2;
