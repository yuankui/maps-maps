import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";


function FeatureMap({ emitter, accessToken, id, mapStyle }) {

    const [key] = useState(id);
    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        const map = new mapboxgl.Map({
            container: id,
            style: mapStyle,
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
            if (type === 'set-layer-visible') {
                if (data.visible === true) {
                    map.setLayoutProperty('layer-text-' + data.name, 'visibility', 'visible');
                    map.setLayoutProperty('layer-' + data.name, 'visibility', 'visible');
                } else {
                    map.setLayoutProperty('layer-' + data.name, 'visibility', 'none');
                    map.setLayoutProperty('layer-text-' + data.name, 'visibility', 'none');
                }
                return;
            }

            if (type === 'add-layer') {
                addLayer(data);
            }
        };

        // add listener
        emitter.on('*', listener);

        // destory
        return () => {
            emitter.off('*', listener);
            map.remove();
        }
        // eslint-disable-next-line
    }, []);

    return <div id={key} />
}

export default FeatureMap;