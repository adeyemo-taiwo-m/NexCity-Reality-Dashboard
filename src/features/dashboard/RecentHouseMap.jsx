import React, { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// Import L (Leaflet namespace) directly here, but only use it inside the component lifecycle/hooks.
import L, { Icon } from "leaflet";
import useProperties from "./useProperties";
import "leaflet/dist/leaflet.css";

/* CRITICAL FIX: The icon must be defined inside the component 
  lifecycle (or useMemo) to ensure the Leaflet library (L) is available. 
*/
const brandMarkerSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23054c93'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E";

/* FitBounds component: fits map bounds and invalidates size */
function FitBounds({ properties }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Invalidate size when map is ready (helps with hidden containers)
    map.whenReady(() => {
      setTimeout(() => map.invalidateSize(), 250);
    });

    const coords = properties
      .map((p) => {
        // Coerce to numbers and filter invalid values
        const lat = Number(p.lat);
        const lng = Number(p.lng);
        if (!isFinite(lat) || !isFinite(lng)) return null;
        return [lat, lng];
      })
      .filter(Boolean);

    if (coords.length === 0) return;

    try {
      // Use L.latLngBounds
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [40, 40] });
    } catch (err) {
      // fallback: center to first coordinate
      const [first] = coords;
      if (first) map.setView(first, 10);
      console.error("FitBounds error:", err);
    }
  }, [map, properties]);

  return null;
}

export default function RecentHouseMap() {
  // Define the brandMarker inside useMemo to ensure Leaflet is loaded when accessed
  const brandMarker = useMemo(() => {
    // Note: If Icon is imported directly, you can use `new Icon(...)` here.
    // Since we import L, we can rely on L.icon as a safe fallback too.
    return new L.Icon({
      iconUrl: brandMarkerSvg,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }, []); // Empty dependency array means it's only created once

  // Be resilient: support either isPending or isLoading
  const result = useProperties();
  // result might be { properties, isPending } or { properties, isLoading }
  const properties = result?.properties ?? result?.data ?? [];
  const isLoading = result?.isPending ?? result?.isLoading ?? false;

  // DEBUG logs — remove these once verified
  useEffect(() => {
    // console.info("useProperties result:", result); // REMOVED DEBUG
    // console.info("Parsed properties count:", (properties || []).length); // REMOVED DEBUG
  }, [result, properties]);

  // Ensure we only use entries with valid numeric lat/lng
  const validProperties = useMemo(() => {
    return (properties ?? [])
      .map((p) => ({
        ...p,
        lat: p.lat !== undefined ? Number(p.lat) : undefined,
        lng: p.lng !== undefined ? Number(p.lng) : undefined,
      }))
      .filter(
        (p) =>
          p.lat !== undefined &&
          p.lng !== undefined &&
          isFinite(p.lat) &&
          isFinite(p.lng)
      );
  }, [properties]);

  // Default center: use first property if available, otherwise Nigeria center
  const defaultCenter = validProperties.length
    ? [validProperties[0].lat, validProperties[0].lng]
    : [9.082, 8.6753];

  // UX: explicit map height parent — ensure your CSS doesn't collapse this container.
  if (isLoading) {
    return (
      <article className="flex flex-col flex-1 h-full items-start p-4 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          Loading map…
        </div>
      </article>
    );
  }

  if (!validProperties.length) {
    return (
      <article className="flex flex-col flex-1 h-full items-start p-4 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          No properties with coordinates yet.
        </div>
      </article>
    );
  }

  return (
    <article
      className="flex flex-col  h-full  items-start p-4 bg-white rounded-lg shadow-sm overflow-hidden"
      aria-label="Recent properties map section"
    >
      <div className="w-full h-100 lap:h-full  rounded-lg overflow-hidden">
        <MapContainer
          center={defaultCenter}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          <FitBounds properties={validProperties} />

          {validProperties.map((prop) => (
            <Marker
              key={prop.id}
              position={[prop.lat, prop.lng]}
              icon={brandMarker}
            >
              <Popup>
                <div className="max-w-xs p-1">
                  <h4 className="font-semibold text-base">{prop.title}</h4>
                  <p className="text-sm text-gray-600">{prop.location}</p>
                  <p className="mt-1 text-lg font-bold text-[#054c93]">
                    ₦{prop.price?.toLocaleString() ?? "—"}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      prop.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {prop.status}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </article>
  );
}
