import { SketchPicker } from "react-color";

function ColorInput({value, onChange}) {
    return <SketchPicker className='m-2' color={value} onChange={e => {
        onChange(e.hex);
    }} />
}

export default ColorInput;