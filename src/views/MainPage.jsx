import Input from "../components/Input";
import Result from "../components/Results";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
const apiKEY = import.meta.env.VITE_REACT_APP_API_KEY;
const MainPage = () => {
  const [data, setData] = useState({
    ip: "8.8.8.8",
    location: {
      country: "US",
      city: "California",
      timezone: "-07:00",
      postalCode: "94043",
      lat: "40.52006",
      lng: "-82.09737",
    },
    isp: "Google LLC",

  });
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("8.8.8.8");
  const [error, setError] = useState("");
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKEY}&ipAddress=${inputValue}`,
      );
      setData({
        ip: response.data.ip,
        location: {
          country: response.data.location.country,
          city: response.data.location.city,
          postalCode: response.data.location.postalCode,
          timezone: response.data.location.timezone,
          lat: response.data.location.lat,
          lng: response.data.location.lng,
        },
        isp: response.data.isp,
      });
      console.log(response);
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
          key={`${data.location.lat}-${data.location.lng}`}
          center={[data.location.lat, data.location.lng]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
              key={`${data.location.lat}-${data.location.lng}`}
              position={[data.location.lat, data.location.lng]}
          >
            <Popup>{data.isp}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};
export default MainPage;
