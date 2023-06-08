import { useState } from "react";
import { Button, Modal } from "antd";

interface IModalCustom {
  onClick: () => void;
  children: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const ModalCustom = ({ onClick, children, title, content }: IModalCustom) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onClick();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>{children}</Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {content}
      </Modal>
    </>
  );
};

export default ModalCustom;
