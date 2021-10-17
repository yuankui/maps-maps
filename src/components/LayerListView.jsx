import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

/**
 * 控制台图层数据列表
 * @param {*} param0 
 * @returns 
 */
function LayerListView({ layers, onToggle }) {
    return <>
        <h1 className='text-2xl mb-4'>图层管理</h1>
        {
            layers.map(layer => {
                return <div key={layer.name} className='mb-2 flex flex-row items-center py-1 px-2 border-1 rounded justify-between'>
                    <div className='flex flex-row items-center'>
                        <div className='inline-flex w-3 h-3 rounded-full mx-1' style={{
                            backgroundColor: layer.color,
                        }} />
                        <div className='p-1 pr-2' style={{
                            opacity: layer.visible ? 1 : 0.2,
                        }}>{layer.name}</div>

                    </div>
                    <div className='flex flex-row items-center justify-center'>
                        
                        <button href='' onClick={e => {
                            e.preventDefault();
                            onToggle(layer.name);
                        }} className='flex flex-row items-center'>
                            {layer.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </button>
                    </div>
                </div>
            })
        }
    </>
}

export default LayerListView;