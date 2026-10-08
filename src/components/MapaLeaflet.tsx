import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface UfStat {
  uf: string;
  aptos: number;
  comparecimento: number;
  abstencoes: number;
  taxa_abstencao: number;
  taxa_comparecimento: number;
}

interface Props {
  stats: Map<string, UfStat>;
  geojson: any;
  onHover: (uf: UfStat | null) => void;
}

const MapaLeaflet: React.FC<Props> = ({ stats, geojson, onHover }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || !geojson) return;
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    }).setView([-14.2350, -51.9253], 4); // centro aproximado do BR

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '',
    }).addTo(map);

    const geojsonLayer = L.geoJSON(geojson, {
      style: (feature) => {
        const sigla = feature?.properties?.sigla as string | undefined;
        const stat = sigla ? stats.get(sigla) : undefined;
        return {
          fillColor: stat ? getColor(stat.taxa_abstencao) : '#2a2824',
          weight: 1.2,
          opacity: 1,
          color: '#0d0d0b',
          fillOpacity: 0.92,
        };
      },
      onEachFeature: (feature, layer) => {
        const sigla = feature?.properties?.sigla as string | undefined;
        const stat = sigla ? stats.get(sigla) : undefined;
        if (sigla) {
          (layer as L.Path).bindTooltip(sigla, {
            permanent: true,
            direction: 'center',
            className: 'uf-label',
            interactive: false,
          });
        }
        layer.on({
          mouseover: () => onHover(stat ?? null),
          mouseout: () => onHover(null),
          click: () => onHover(stat ?? null),
        });
      },
    }).addTo(map);

    leafletMapRef.current = map;

    return () => {
      map.remove();
    };
  }, [geojson, stats]);

  function getColor(taxa: number): string {
    const MIN = 12, MAX = 26;
    const t = Math.max(0, Math.min(1, (taxa - MIN) / (MAX - MIN)));
    const r = Math.round(0x4a + (0xff - 0x4a) * t);
    const g = Math.round(0x46 + (0xc4 - 0x46) * t);
    const b = Math.round(0x3f + (0x00 - 0x3f) * t);
    const toHex = (v: number) => v.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default MapaLeaflet;