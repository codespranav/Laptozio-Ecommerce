import { Button, Modal } from 'antd';
import FormBox from './FormBox';

const ModalBox = () => {
  return (
    <div>
       <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <FormBox/>
      </Modal>
    </div>
  )
}

export default ModalBox
