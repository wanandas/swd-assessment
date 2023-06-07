import { useTranslation } from "react-i18next";
import { LayoutMain } from "../components/templates";
import { Space, Form, Input, DatePicker, Select, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../core/store/store";
import {
  IFormState,
  addOrEditTableData,
  clearForm,
  getTableDataForEdit,
  setForm,
} from "../core/store/slice/form";
import { useCallback } from "react";
import { IdCardInput } from "../components/Atoms";
import dayjs from "dayjs";

const { Item } = Form;

const Test2 = () => {
  const { t } = useTranslation();

  const { dateOfBirth, ...formInit } = useSelector(
    (state: RootState) => state.form
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm<IFormState>();

  const onGetTableDataForEdit = useCallback(async () => {
    await dispatch(getTableDataForEdit({ id: 225236324 }));
    form.resetFields();
  }, [dispatch, form]);

  return (
    <LayoutMain>
      <h1 onClick={onGetTableDataForEdit}>{t("common.test-2")}</h1>
      <Space
        style={{
          border: "1px solid #000",
          padding: "1rem",
          minWidth: "100%",
        }}
      >
        <Form
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          initialValues={{
            ...formInit,
            idCardNumber: "",

            dateOfBirth: dateOfBirth ? dayjs(dateOfBirth, "DD/MM/YYYY") : null,
          }}
          form={form}
          onValuesChange={(v) => {
            if (v.dateOfBirth) {
              dispatch(
                setForm({ dateOfBirth: v.dateOfBirth.format("DD/MM/YYYY") })
              );
            } else {
              dispatch(setForm(v));
            }
          }}
          onFinish={(v) => {
            dispatch(addOrEditTableData({ ...v, id: formInit?.id }));
          }}
        >
          <Item label="titleName" name="titleName">
            <Select
              style={{ width: 120 }}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </Item>
          <Item name="firstName" label="firstName" rules={[{ required: true }]}>
            <Input />
          </Item>
          <Item name="lastname" label="lastName" rules={[{ required: true }]}>
            <Input />
          </Item>

          <Item label="DatePicker" name="dateOfBirth">
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) => current && current > dayjs()}
              format="DD/MM/YYYY"
              showToday={false}
              placeholder="Select date"
            />
          </Item>
          <Item label="nationality">
            <Select
              style={{ width: 120 }}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </Item>
          <Item label="idCard์Number">
            <IdCardInput
              onChange={async (v) => {
                await dispatch(setForm({ idCardNumber: v }));
              }}
            />
          </Item>

          <Item label="Button">
            <Button
              onClick={async () => {
                await dispatch(clearForm());
                form.resetFields();
              }}
            >
              reset
            </Button>
            <Button htmlType="submit">Button</Button>
          </Item>
        </Form>
      </Space>
    </LayoutMain>
  );
};

export default Test2;
