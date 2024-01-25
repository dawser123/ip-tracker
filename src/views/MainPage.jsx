import Input from "../components/Input";
import Result from "../components/Results";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
const apiKEY = import.meta.env.VITE_REACT_APP_API_KEY;
const MainPage = () => {
  const [data, setData] = useState({
    ip: "142.250.180.14",
    city: "London",
    zip: "W1B",
    timezone: "Europe/London",
    isp: "Google LLC",
    lat: "51.5072",
    lon: "-0.127586",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("142.250.180.14");
  const [error, setError] = useState("");
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKEY}&ip=${inputValue}`,
      );
      setData({
        ip: response.data.ip,

        city: response.data.country_capital,
        zip: response.data.zipcode,

        timezone: response.data.time_zone.offset,
        isp: response.data.isp,
        lat: response.data.latitude,
        lon: response.data.longitude,
      });
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };
  const validateInput = (input) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const domainRegex = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/;
    return ipRegex.test(input) || domainRegex.test(input);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (validateInput(inputValue)) {
      fetchData();
      setError("");
    } else {
      setError("Invalid IP address or domain format.");
    }
  };
  return (
    <>
      <div className="relative h-56 bg-imgMobile bg-cover px-10 m:bg-imgDesktop ">
        <h1 className="py-5 text-center text-xl text-white m:text-2xl">
          IP Address Tracker
        </h1>
        <div>
          <Input
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSubmit={submitHandler}
          />
          {error && <p className="text-center  text-red-500">{error}</p>}
          <Result data={data} isLoading={isLoading} />
        </div>
      </div>
      <div className="h-full w-full ">
        <MapContainer
          key={`${data.lat}-${data.lon}`}
          center={[data.lat, data.lon]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            key={`${data.lat}-${data.lon}`}
            position={[data.lat, data.lon]}
          >
            <Popup>{data.isp}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};
export default MainPage;
