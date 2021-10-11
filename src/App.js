import mapboxgl from "mapbox-gl";
import mitt from 'mitt';
import { useEffect, useState } from "react";
import "./App.css";
import points1 from "./data/points1.json";
import LayerManageView from "./manage/LayerManageView";
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';

const emitter = mitt();

const accessToken =
    "pk.eyJ1IjoieXVhbmt1aSIsImEiOiJja3VtNGhranUwNzg3MzBsaWx2dnFod2ZjIn0.gCAWnEO9GQ2reK72LZXUQA";

const defaultLayers = [
    {
        name: 'points1',
        color: "#FF0000",
        points: points1,
    },
];

function App() {
    const [, setVisible] = useState(true);
    const [layers, setLayers] = useState(defaultLayers);
    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/yuankui/ckumcg5loegxe17pr0kay2zkd",
            center: [113.934298, 22.506958],
            zoom: 10,
        });

        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(new mapboxgl.NavigationControl());



        const addLayer = (layer) => {
            map.addSource(layer.name, {
                type: "geojson",
                data: layer.points,
            });

            map.addLayer({
                id: "layer-" + layer.name,
                type: "circle",
                source: layer.name,
                paint: {
                    "circle-radius": 3,
                    "circle-color": layer.color,
                },
                filter: ["==", "$type", "Point"],
            });

            map.addLayer({
                id: "layer-text-" + layer.name,
                type: "symbol",
                source: layer.name,
                layout: {
                    "text-field": '{name}',
                    'text-anchor': 'left',
                    'text-size': 12,
                },
                paint: {
                    'text-color': layer.color,
                    "text-translate": [4, 4],
                    'text-halo-blur': 2,
                    "text-halo-width": 2,
                    "text-halo-color": '#FFF'
                },
                filter: ["==", "$type", "Point"],
            });
        }
        const listener = (type, data) => {
            if (type === 'toggle') {
                setVisible(prev => {
                    if (prev === true) {
                        map.setLayoutProperty('layer-points1', 'visibility', 'none');
                    } else {
                        map.setLayoutProperty('layer-points1', 'visibility', 'visible');
                    }
                    return !prev;
                })
                return;
            }

            if (type === 'add-layer') {
                addLayer(data);
            }
        };

        map.on("load", () => {

            // add layer
            for (const layer of layers) {
                addLayer(layer);
            };
        });

        // add listener
        emitter.on('*', listener);

        // destory
        return () => {
            emitter.off('*', listener);
            map.remove();
        }
    });

    return (
        <div className="App p-10 flex items-center flex-col">
            <div className="w-3/4">
                <h1 className="font-bold font-5xl">Map Demo</h1>
                
                <div className='relative flex flex-col items-stretch'>
                    <div id="map" className=""></div>
                    <dev className='absolute left-2 top-2 bg-white p-5 rounded'>
                        <h1 className='text-2xl mb-4'>图层管理</h1>
                        {
                            [1,2].map(d => {
                                return <div key={d} className='mb-2 w-48 flex flex-row items-center py-1 px-2 border-2 rounded justify-between'>
                                    <div className='flex flex-row items-center'>
                                        <div className='p-1 pr-2'>图层名</div>
                                        <div className='inline-flex w-3 h-3 bg-blue-500 rounded-full'></div>
                                    </div>
                                    <div className='flex flex-row items-center justify-center'>
                                        <a href='#' className='flex flex-row items-center'>
                                            {<EyeOutlined />}
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
