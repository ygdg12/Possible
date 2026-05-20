import { MAPS_URL, OFFICE_LOCATION } from "../data/siteData.js";

export default function LocationCard() {
  return (
    <div className="location-card">
      <div className="location-card-map" aria-hidden="true">
        <div className="location-card-grid" />
        <div className="location-card-pin">
          <span className="location-card-pulse location-card-pulse--1" />
          <span className="location-card-pulse location-card-pulse--2" />
          <span className="location-card-pulse location-card-pulse--3" />
          <div className="location-card-pin-ring" />
          <div className="location-card-pin-core" />
          <div className="location-card-pin-dot" />
        </div>
      </div>
      <div className="location-card-body">
        <h3 className="location-card-title">{OFFICE_LOCATION.title}</h3>
        <p className="location-card-address">{OFFICE_LOCATION.address}</p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="location-card-link"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  );
}
