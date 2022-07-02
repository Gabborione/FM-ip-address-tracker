import "./App.css";
import L from "leaflet";
import {
    MapContainer as LeafletMap,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import styled from "styled-components";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
    return (
        <Container>
            <Header>
                <Title>IP Address Tracker</Title>
                <Form>
                    <input type="text" placeholder="192.212.174.101" />
                    <button type="submit">
                        <img src="images/icon-arrow.svg" />
                    </button>
                </Form>
                <Results>
                    <div>
                        <Subtitle>IP Address</Subtitle>
                        <Info>192.212.174.101</Info>
                    </div>

                    <div>
                        <Subtitle>LOCATION</Subtitle>
                        <Info>Brooklyn, NY 10001</Info>
                    </div>

                    <div>
                        <Subtitle>TIMEZONE</Subtitle>
                        <Info>UTC-05:00</Info>
                    </div>

                    <div>
                        <Subtitle>ISP</Subtitle>
                        <Info>SpaceX Starlink</Info>
                    </div>
                </Results>
            </Header>
            <div>
                <LeafletMap
                    center={[51.505, -0.09]}
                    zoom={20}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </LeafletMap>
            </div>
        </Container>
    );
}

const Container = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
`;

const Header = styled.header`
    position: relative;
    height: 33vh;
    padding: 5%;
    background: url("images/pattern-bg.png") center center fixed;
    background-size: cover;
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
        padding: 2rem;
        font-weight: 700;
        color: var(--very-dark-grey);
    }

    button {
        width: 20%;
        height: 100%;
        border: none;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        background-color: var(--very-dark-grey);
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

export default App;
