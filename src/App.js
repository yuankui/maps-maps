import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import mitt from 'mitt';
import { useState } from "react";
import "./App.css";
import FeatureMap from "./FeatureMap";
import LayerManageView from "./manage/LayerManageView";

const emitter = mitt();

const accessToken =
    "pk.eyJ1IjoieXVhbmt1aSIsImEiOiJja3VtNGhranUwNzg3MzBsaWx2dnFod2ZjIn0.gCAWnEO9GQ2reK72LZXUQA";

function App() {
    const [layers, setLayers] = useState([]);
    return (
        <div className="App p-10 flex items-center flex-col">
            <div className="w-3/4">
                <h1 className="font-bold font-5xl">Map Demo</h1>
                
                <div className='relative flex flex-col items-stretch'>
                    <FeatureMap 
                        accessToken={accessToken} 
                        mapStyle={"mapbox://styles/yuankui/ckumcg5loegxe17pr0kay2zkd"}
                        emitter={emitter}
                        id='map'
                        />
                    <dev className='absolute left-2 top-2 bg-white p-5 rounded w-56'>
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
                                            // 禁用
                                            const newLayers = layers.map(l => {
                                                if (l.name === layer.name) {
                                                    return {
                                                        ...layer,
                                                        visible: !layer.visible
                                                    };
                                                } else {
                                                    return l;
                                                }
                                            })
                                            setLayers(newLayers);
                                            emitter.emit('set-layer-visible', {
                                                ...layer,
                                                visible: !layer.visible
                                            });

                                        }} className='flex flex-row items-center'>
                                            {layer.visible ? <EyeOutlined /> : <EyeInvisibleOutlined/>}
                                        </a>
                                    </div>
                                </div>    
                            })
                        }
                        
                        <LayerManageView onAddLayer={({title, data, color}) => {
                            console.log(title, data, color);
                            setLayers(prev => [...prev, {
                                name: title,
                                color,
                                points: data,
                                visible: true,
                            }]);
                            emitter.emit('add-layer', {
                                name: title,
                                color,
                                points: data,
                            })
                        }}/>
                    </dev>
                </div>
            </div>
        </div>
    );
}

export default App;
