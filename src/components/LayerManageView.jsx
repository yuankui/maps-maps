import { Button, Input, message, Modal } from "antd";
import { useCallback, useRef, useState } from "react";
import { SketchPicker } from "react-color";

function LayerManageView({ onAddLayer }) {
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [color, setColor] = useState('#FFFFFF')

    const fileRef = useRef();

    const reset = useCallback(() => {
        setText(undefined);
        setName(undefined);
        if (fileRef.current != null) {
            fileRef.current.setValue(null);
        }
    }, []);

    
    const hideModal = useCallback(() => {
        setShowModal(false);
        reset();
        // eslint-disable-next-line
    }, []);


    return <>
        <Button onClick={e => {
            setShowModal(true);
        }}>
            新增图层
        </Button>
        <Modal visible={showModal}
            onCancel={hideModal}
            onOk={e => {
                if (name === undefined || name === '') {
                    message.error("LayerName 不能为空");
                    return;
                }
                if (color === undefined) {
                    message.error("颜色不能为空");
                    return;
                }

                if (text === undefined) {
                    message.error("text不能为空");
                    return;
                }

                let points;
                try {
                    points = JSON.parse(text);
                } catch (e) {
                    message.error("请选择geojson文件");
                    return;
                }
                try {
                    onAddLayer({ name, points, color });
                } catch (e) {
                    message.error(e.message);
                    return;
                }

                reset();
                hideModal();
            }}
        >
            <Input value={name} placeholder="LayerName" onChange={e => {
                setName(e.target.value);
            }} />
            <Input ref={fileRef} type='file' onChange={async (e) => {
                const text = await e.target.files[0].text();
                setText(text);
            }} />
            <SketchPicker color={color} onChange={e => {
                setColor(e.hex);
            }} />
        </Modal>
    </>
}

export default LayerManageView;