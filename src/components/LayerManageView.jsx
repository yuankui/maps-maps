import { Button, Form, Input, message, Modal } from "antd";
import { useCallback, useState } from "react";
import ColorInput from "./form/ColorInput";
import GeojsonFileInput from "./form/GeojsonFileInput";


function LayerManageView({ onAddLayer }) {
    const [showModal, setShowModal] = useState(false);

    const hideModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const finishForm = (data) => {
        try {
            onAddLayer(data)
            hideModal()
        } catch(e) {
            message.error(e.message)
        }
    }

    return <>
        <Button onClick={e => {
            setShowModal(true);
        }}>
            新增图层
        </Button>
        <Modal
            visible={showModal}
            onCancel={hideModal}
        >
            <h1 className='m-2 text-2xl'>新增图层</h1>
            <Form onFinish={finishForm}>
                <Form.Item name="name" rules={[{ required: true }]}>
                    <Input className='m-2' placeholder="LayerName" />
                </Form.Item>
                <Form.Item name="points" rules={[{ required: true }]}>
                    <GeojsonFileInput />
                </Form.Item>
                <Form.Item name="color" rules={[{ required: true }]}>
                    <ColorInput />
                </Form.Item>
                <Form.Item>
                    <Button onClick={hideModal}>Cancel</Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default LayerManageView;