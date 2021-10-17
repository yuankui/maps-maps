import { Input, message } from "antd";

function GeojsonFileInput({ value, onChange }) {
    return <Input
        placeholder='geojson文件'
        accept='.geojson,.json'
        className='m-2'
        type='file'
        onChange={async (e) => {
            const text = await e.target.files[0].text();
            try {
                let points = JSON.parse(text);
                onChange(points);
            } catch (e) {
                message.error("请选择geojson文件");
                return;
            }
        }} />
}

export default GeojsonFileInput;