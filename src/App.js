import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import mitt from 'mitt';
import { useCallback, useState } from "react";
import "./App.css";
import FeatureMap from "./FeatureMap";
import LayerManageView from "./manage/LayerManageView";

const emitter = mitt();

const accessToken =
    "pk.eyJ1IjoieXVhbmt1aSIsImEiOiJja3VtNGhranUwNzg3MzBsaWx2dnFod2ZjIn0.gCAWnEO9GQ2reK72LZXUQA";
const styleUrl = "mapbox://styles/yuankui/ckumcg5loegxe17pr0kay2zkd";

function App() {
    const [layers, setLayers] = useState([]);

    // 新增一组位置
    const addLayer = useCallback((newLayer) => {
        setLayers(prev => [...prev, newLayer]);
        emitter.emit('add-layer', newLayer);
    }, []);

    // 禁用
    const toggleLayer = useCallback((name) => {
        setLayers(prev => {
            
            let layerVisible = false;

            const newLayers = prev.map(layer => {
                return layer.name !== name ? layer : {
                    ...layer,
                    visible: layerVisible = !layer.visible
                }
            });

            emitter.emit('set-layer-visible', {
                name: name,
                visible: layerVisible
            });

            return newLayers;
        })
    }, [])

    return (
        <div className="App p-10 flex items-center flex-col">
            <div className="w-3/4">
                <h1 className="font-bold font-5xl">Map Demo</h1>
                
                <div className='relative flex flex-col items-stretch'>
                    {/* 地图 */}
                    <FeatureMap
                        accessToken={accessToken} 
                        mapStyle={styleUrl}
                        emitter={emitter}
                        id='map'
                        />
                    {/* 控制面板 */}
                    <div className='absolute left-2 top-2 bg-white p-5 rounded w-56'>
                        <h1 className='text-2xl mb-4'>图层管理</h1>
                        {
                            layers.map(layer => {
                                return <div key={layer.name} className='mb-2 flex flex-row items-center py-1 px-2 border-1 rounded justify-between'>
                                    <div className='flex flex-row items-center'>
                                    <div className='inline-flex w-3 h-3 rounded-full mx-1' style={{
                                            backgroundColor: layer.color,
                                        }}/>
                                    <div className='p-1 pr-2' style={{
                                        opacity: layer.visible ? 1 : 0.2,
                                    }}>{layer.name}</div>
                                        
                                    </div>
                                    <div className='flex flex-row items-center justify-center'>
                                        <a href='' onClick={e => {
                                            e.preventDefault();
                                            toggleLayer(layer.name);
                                        }} className='flex flex-row items-center'>
                                            {layer.visible ? <EyeOutlined /> : <EyeInvisibleOutlined/>}
                                        </a>
                                    </div>
                                </div>    
                            })
                        }
                        
                        {/* 弹窗 */}
                        <LayerManageView onAddLayer={({name, points, color}) => {
                            addLayer({
                                name,
                                color,
                                points,
                                visible: true,
                            })
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
