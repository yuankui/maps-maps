import { Button, Input, Modal } from "antd";
import { useState } from "react";

function LayerManageView({onAddLayer}) {
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState(undefined);
    const [title, setTitle] = useState(undefined);

    return <>
        <Button onClick={e=> {
            setShowModal(true);
        }}>
            新增图层
        </Button>
        <Modal visible={showModal} 
        onCancel={e=> setShowModal(false)} 
        onOk={e=> {
            onAddLayer(title, text);
            setShowModal(false);
        }}
        >
            <Input value={title} placeholder="LayerName" onChange={e => {
                setTitle(e.target.value);
            }}/>
            <Input type='file' onChange={async (e) => {
                const text = await e.target.files[0].text();
                setText(text);
            }}/>
        </Modal>
    </>
}

export default LayerManageView;