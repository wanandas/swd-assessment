import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import { IdCardInput, MobileNumberInput } from "../../Atoms";
import { useDispatch, useSelector } from "react-redux";
import { IFormState, clearForm, setForm } from "../../../core/store/slice/form";

import dayjs from "dayjs";
import { regExp } from "../../../constants/regExp";
import { FormInstance } from "antd/lib/form";
import { useTranslation } from "react-i18next";
import { ButtonWraper } from "./FormItem.styled";
import { RootState } from "../../../core/store/store";
import { useMemo } from "react";

const { Item } = Form;

interface IFormItems {
  form: FormInstance<IFormState>;
}

const FormItems = ({ form }: IFormItems) => {
  const dispatch = useDispatch();
  const { idCardNumber } = useSelector((state: RootState) => state.form);

  const { t } = useTranslation();

  const titleNameOptions = [
    { value: "mr", label: t("common.titleName.mr") },
    { value: "mrs", label: t("common.titleName.mrs") },
    { value: "miss", label: t("common.titleName.miss") },
  ];

  const nationalityOptions = [
    { value: "thai", label: t("common.thai") },
    { value: "lao", label: t("common.lao") },
  ];

  const sexOptions = [
    {
      value: "m",
      label: t("common.sex.m"),
    },
    {
      value: "f",
      label: t("common.sex.f"),
    },
  ];

  const idCardNumberMemo = useMemo(() => {
    if (idCardNumber && idCardNumber.length === 13) {
      return idCardNumber;
    }
    return undefined;
  }, [idCardNumber]);

  return (
    <>
      <Item
        label={t("form.titleName")}
        name="titleName"
        rules={[{ required: true, message: <>{t("form.error.require")}</> }]}
      >
        <Select style={{ width: 120 }} options={titleNameOptions} />
      </Item>
      <Item
        name="firstName"
        label={t("form.firstName")}
        rules={[{ required: true, message: <>{t("form.error.require")}</> }]}
      >
        <Input />
      </Item>
      <Item
        name="lastName"
        label={t("form.lastName")}
        rules={[{ required: true, message: <>{t("form.error.require")}</> }]}
      >
        <Input />
      </Item>

      <Item
        label={t("form.dateOfBirth")}
        name="dateOfBirth"
        rules={[{ required: true, message: <>{t("form.error.require")}</> }]}
      >
        <DatePicker
          disabledDate={(current) => current && current > dayjs()}
          format="DD/MM/YYYY"
          showToday={false}
          placeholder="Select birth date"
        />
      </Item>
      <Item
        label={t("form.nationality")}
        name="nationality"
        rules={[{ required: true, message: <>{t("form.error.require")}</> }]}
      >
        <Select style={{ width: 120 }} options={nationalityOptions} />
      </Item>

      <Item label={t("form.idCardNumber")} name="idCardNumber">
        <IdCardInput
          initValue={idCardNumberMemo}
          onChange={async (v) => {
            await dispatch(setForm({ idCardNumber: v }));
          }}
        />
      </Item>

      <Item
        label={t("form.sex")}
        name="sex"
        rules={[{ required: true, message: <>{t("form.error.require")}</> }]}
      >
        <Radio.Group options={sexOptions} />
      </Item>

      <Item
        label={t("form.mobileNumber")}
        name="mobileNumber"
        rules={[
          {
            required: true,
            pattern: new RegExp(regExp.mobileNumber),
            message: <>{t("form.error.mobileNumber")}</>,
            len: 10,
            validateTrigger: "onBlur",
          },
        ]}
      >
        <MobileNumberInput />
      </Item>

      <Item label={t("form.passportId")} name="passportId">
        <Input />
      </Item>

      <Item
        label={t("form.salary")}
        name="salary"
        rules={[
          {
            required: true,
            message: <>{t("form.error.onlyNumber")}</>,
            pattern: new RegExp(regExp.onlyNumber),
            validateTrigger: "onBlur",
          },
        ]}
      >
        <Input />
      </Item>

      <ButtonWraper>
        <Button
          type="ghost"
          onClick={async () => {
            await dispatch(clearForm());
            form.resetFields();
          }}
        >
          {t("common.button.reset")}
        </Button>
        <Button type="primary" htmlType="submit">
          {t("common.button.submit")}
        </Button>
      </ButtonWraper>
    </>
  );
};

export default FormItems;
