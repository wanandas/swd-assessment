import { Button, Checkbox, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableStyle } from "./TableCustom.styled";
import { IFormState } from "../../../core/store/slice/form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { ModalCustom } from "../../Molecules";

interface ITableCustom {
  data: IFormState[];
  onEdit: (id: number) => void;
  onDelete: (id: number[]) => void;
}

const TableCustom = ({ data, onEdit, onDelete }: ITableCustom) => {
  const { t } = useTranslation();
  // form IFormState
  const keys = ["name", "sex", "mobileNumber", "nationality", "action"];
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const columns: ColumnsType<IFormState> = keys.map((key) => {
    let asset = {};

    if (key === "action") {
      asset = {
        fixed: "right",
        render: (_text: string, record: IFormState) => (
          <Space size="middle">
            <Button onClick={() => record.id && onEdit(record.id)}>
              {t("common.button.edit")}
            </Button>

            <ModalCustom
              onClick={() => record.id && handleDelete([record.id])}
              title={t("modal.delete.title")}
              content={t("modal.delete.deleteContent")}
            >
              {t("common.button.delete")}
            </ModalCustom>
          </Space>
        ),
        sorter: undefined,
      };
    }
    if (key === "name") {
      asset = {
        render: (_text: unknown, record: IFormState) => (
          <Space>
            {record.firstName} {record.lastName}
          </Space>
        ),
      };
    }
    if (key === "sex") {
      asset = {
        render: (_text: unknown, record: IFormState) =>
          t(`common.sex.${record.sex}`),
      };
    }

    const render = (_text: string, record: IFormState) => {
      return <>{record[key as keyof IFormState]}</>;
    };

    return {
      key: key,
      title: t(`form.${key}`),
      dataIndex: key,
      render: render,
      sorter: (a: IFormState, b: IFormState) =>
        a[key as keyof IFormState] > b[key as keyof IFormState] ? 1 : -1,
      ...asset,
    };
  });

  const handleDelete = (id: number[]) => {
    onDelete(id);
  };

  return (
    <TableWrapper>
      <TableStyle
        title={() => {
          return (
            <Space>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRowKeys(data.map((item) => item?.id as number));
                  } else {
                    setSelectedRowKeys([]);
                  }
                }}
                checked={
                  data.length > 0
                    ? data.every((a) =>
                        selectedRowKeys.includes(a.id as number)
                      )
                    : false
                }
              >
                {t("common.button.selectAll")}
              </Checkbox>

              <ModalCustom
                onClick={() => {
                  handleDelete(selectedRowKeys);
                }}
                title={t("modal.delete.title")}
                content={t("modal.delete.deleteAllContent")}
              >
                {t("common.button.delete")}
              </ModalCustom>
            </Space>
          );
        }}
        rowKey={"id"}
        rowSelection={{
          preserveSelectedRowKeys: true,
          hideSelectAll: true,
          selectedRowKeys: selectedRowKeys,
          onSelect: (_record, _selected, selectedRows: IFormState[]) => {
            setSelectedRowKeys(
              selectedRows ? selectedRows.map((item) => item?.id as number) : []
            );
          },
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1280 }}
        pagination={{
          defaultPageSize: 10,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </TableWrapper>
  );
};

const TableWrapper = styled(Space)`
  width: 100%;
  justify-content: center;
  flex: 1;
  display: flex;
  .ant-space-item {
    width: 100%;
    max-width: 1280px;
  }
`;

export default TableCustom;
