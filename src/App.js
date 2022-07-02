import "./App.css";
import L from "leaflet";
import {
    MapContainer as LeafletMap,
    TileLayer,
    Marker,
    useMap,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import styled from "styled-components";
import { useEffect, useState } from "react";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const defaultInfo = {
    ip: "8.8.8.8",
    location: {
        country: "US",
        region: "California",
        city: "Mountain View",
        lat: 37.40599,
        lng: -122.078514,
        postalCode: "94043",
        timezone: "-07:00",
        geonameId: 5375481,
    },
    domains: [
        "0d2.net",
        "003725.com",
        "0f6.b0094c.cn",
        "007515.com",
        "0guhi.jocose.cn",
    ],
    as: {
        asn: 15169,
        name: "Google LLC",
        route: "8.8.8.0/24",
        domain: "https://about.google/intl/en/",
        type: "Content",
    },
    isp: "Google LLC",
};

function App() {
    const [mapCenter, setMapCenter] = useState({
        lat: 34.80746,
        lng: -40.4796,
    });
    const [ip, setIp] = useState("");
    const [insertIp, setInsertIp] = useState("");
    const [info, setInfo] = useState(defaultInfo);

    const APIKEY = "at_c0Do2ZwAlTmZriKxy1jhf3WK770yZ";

    useEffect(() => {
        const getData = async () => {
            await fetch("https://geolocation-db.com/json/")
                .then((response) => response.json())
                .then((data) => setIp(data.IPv4));
        };

        getData();
    }, []);

    useEffect(() => {
        const getIpData = async () => {
            await fetch(
                `
                https://geo.ipify.org/api/v2/country,city?apiKey=${APIKEY}&ipAddress=${ip}`
            )
                .then((response) => response.json())
                .then((data) => {
                    setInfo(data);
                    setMapCenter([data.location.lat, data.location.lng]);
                });
        };

        getIpData();
    }, [ip]);

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIp(insertIp);
    };

    return (
        <Container>
            <Header>
                <Title>IP Address Tracker</Title>
                <Form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={
                            info != undefined ? info.ip : "192.212.174.101"
                        }
                        id="first_name"
                        name="newIp"
                        onChange={(event) => setInsertIp(event.target.value)}
                        value={insertIp}
                    />
                    <button type="submit">
                        <img src="images/icon-arrow.svg" />
                    </button>
                </Form>
                <Results>
                    <div>
                        <Subtitle>IP Address</Subtitle>
                        <Info>{info != undefined ? info.ip : null}</Info>
                    </div>

                    <div>
                        <Subtitle>LOCATION</Subtitle>
                        <Info>
                            {info != undefined ? info.location.city : null},
                            {info != undefined ? info.location.country : null}
                            {info != undefined
                                ? info.location.postalCode
                                : null}
                        </Info>
                    </div>

                    <div>
                        <Subtitle>TIMEZONE</Subtitle>
                        <Info>
                            UTC
                            {info != undefined ? info.location.timezone : null}
                        </Info>
                    </div>

                    <div>
                        <Subtitle>ISP</Subtitle>
                        <Info>{info != undefined ? info.isp : null}</Info>
                    </div>
                </Results>
            </Header>
            <MapContainer>
                <LeafletMap center={mapCenter} zoom="20" scrollWheelZoom={true}>
                    <ChangeView center={mapCenter} zoom="20" />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={mapCenter}></Marker>
                </LeafletMap>
            </MapContainer>
        </Container>
    );
}

const Container = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    background: url("images/pattern-bg.png") center center fixed;
    background-size: cover;
`;

const Header = styled.header`
    position: relative;
    height: 33vh;
    padding: 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 999;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 1.5rem;
    color: #fff;
    font-weight: 500;
`;

const Form = styled.form`
    width: 100%;
    height: 60px;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
        font-size: 1rem;
        width: 80%;
        height: 100%;
        border: none;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        padding-left: 2rem;
        font-weight: 700;
        color: var(--very-dark-grey);
    }

    button {
        width: 20%;
        height: 100%;
        border: none;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        background-color: black;
    }
`;

const Results = styled.div`
    background-color: white;
    border-radius: 15px;
    position: absolute;
    top: 9rem;
    text-align: center;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    gap: 1.5rem;
    z-index: 999;
`;

const Subtitle = styled.h2`
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--dark-grey);
`;

const Info = styled.h3`
    font-size: 1.3rem;
    color: var(--very-dark-grey);
`;

const MapContainer = styled.div``;

export default App;
