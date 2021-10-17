import { GeoJsonLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import { rgb } from 'd3-color';
import React from 'react';
import { FullscreenControl, InteractiveMap as MapboxMap, NavigationControl } from 'react-map-gl';

const mapboxAccessToken = 'pk.eyJ1IjoieXVhbmt1aSIsImEiOiJja3VtNGhranUwNzg3MzBsaWx2dnFod2ZjIn0.gCAWnEO9GQ2reK72LZXUQA';
const mapboxStyle = "mapbox://styles/yuankui/ckumcg5loegxe17pr0kay2zkd"

function colorToRGBArray(color) {
    if (!color) {
        return [255, 255, 255, 0];
    }
    if (Array.isArray(color)) {
        return color.slice(0, 4);
    }
    const c = rgb(color);
    return [c.r, c.g, c.b, 255];
}

function DeckGLView({ geoJsons }) {
    const layers = geoJsons.map(geojson => {
        return new GeoJsonLayer({
            id: 'geojson-layer:' + geojson.name,
            data: geojson.points,
            pickable: true,
            stroked: false,
            filled: true,
            extruded: true,
            pointType: 'circle+text',
            getFillColor: colorToRGBArray(geojson.color),
            getPointRadius: 5,
            pointRadiusUnits: 'pixels',
            getTextAnchor: 'start',
            getTextPixelOffset: [6, 0],
            textCharacterSet: 'auto', // 解决中文不显示的问题
            getText: f => f.properties.name,
            getTextColor: colorToRGBArray(geojson.color),
            getTextSize: 12,
        })
    })

    const [viewport, setViewport] = React.useState({
        longitude: 114.02589,
        latitude: 22.540777,
        zoom: 11,
    });

    return <DeckGL
        initialViewState={viewport}
        {...viewport}
        onViewportChange={setViewport}
        controller={true}
        layers={layers}
    >
        <FullscreenControl style={{
            right: 10,
            top: 10
        }} />

        <NavigationControl
            showCompass={false}
            style={{
                right: 20,
                bottom: 100
            }} />

        <MapboxMap
            mapStyle={mapboxStyle}
            mapboxApiAccessToken={mapboxAccessToken} />
    </DeckGL>
}

export default DeckGLView;