import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { SketchPicker } from "react-color";

function LayerManageView({onAddLayer}) {
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [color, setColor] = useState('#FFFFFF')
    return <>
        <Button onClick={e=> {
            setShowModal(true);
        }}>
            新增图层
        </Button>
        <Modal visible={showModal} 
        onCancel={e=> setShowModal(false)} 
        onOk={e=> {
            onAddLayer({title, data: JSON.parse(text), color});
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
            <SketchPicker color={color} onChange={e => {
                setColor(e.hex);
            }}/>
        </Modal>
    </>
}

export default LayerManageView;