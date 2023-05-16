import Layout from "@/components/Layout"
import axios from "axios"
import { weatherCodes } from "@/lib/weather"
import { useEffect, useState } from "react"
import Image from "next/image"
import Card from "@/components/Card"

const weather = () => {
    const [weather, setWeather] = useState<any>({
        place: "",
        data: []
    })
    const [timeofday, setTimeofday] = useState(true);
    const [changeWeather, setChangeWeather] = useState({
        lat: 59.283041839978246,
        long: 11.107144565259663,
        place: "Sarpsborg"
    })
    
    useEffect(() => {
        const today = new Date();
        if (today.getHours() >= 6 && today.getHours() <= 22) {
          setTimeofday(true)
        } else {
          setTimeofday(false)
        }
        getWeather();
    }, [])

    async function getWeather() {
        try {
            const response = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${changeWeather.lat}&lon=${changeWeather.long}`) 
            const data = []
            for (let i = 0; i < 10; i++) {
              const weatherRaw = response.data.properties.timeseries[i].data.next_1_hours.summary.symbol_code.split("_");
              let weather;
              weatherCodes.forEach((weathercode:{index:number, content:string[]}) => {
                if (weathercode.content.includes(weatherRaw[0])) {
                  weather = weathercode.index
                }
              })
              const d = new Date(response.data.properties.timeseries[i].time)
              data.push({
                airtemp: response.data.properties.timeseries[i].data.instant.details.air_temperature,
                humidity: response.data.properties.timeseries[i].data.instant.details.relative_humidity,
                weather: weather,
                hour: d.getHours()
              })
            }
            setWeather({
                place: changeWeather.place,   
                data,
            })
        } catch (error){
          console.log(error)
        }
      }
  return (
    <Layout UseNav={true}>

        <div className="w-full flex flex-col gap-10">

        <Card bg="gray-800" bordercolor="gray-300" className="w-4/5 mx-auto h-full flex flex-col justify-center items-center gap-10">
                {
                  weather.data.length > 0 &&
                  
                  <div className="w-full">

                    <div className="w-fit mr-auto flex lg:flex-row flex-col items-center gap-10">
                        <Card
                        bg="gray-700"
                        bordercolor="gray-300"
                        className="mr-auto">
                            <h1>The weather in {weather.place}</h1>
                        </Card><Card
                        bg="gray-700"
                        bordercolor="gray-300"
                        className="mr-auto">
                            <h2>
                                For {
                                    weather.data[0].hour + 1 < 10

                                    ? `0${weather.data[0].hour + 1}:00`
                                    : `${weather.data[0].hour + 1}:00`
                                }
                            </h2>
                        </Card>
                    </div>

                  </div>
                }
        </Card>

        <Card
        bg="cyan-800"
        bordercolor="gray-300"
        className="w-4/5 mx-auto h-full">

                {
                    weather.data.length > 0 &&
                    <div className="mr-auto flex lg:flex-row flex-col justify-center items-center gap-10">
                    
                        <Card 
                        bg="cyan-700"
                        bordercolor="cyan-300"
                        className="flex flex-col">
                            <h2 className="mr-auto">Air Temperature</h2>
                            <p className="mr-auto">{weather.data[0].airtemp} °C</p>

                        </Card>
                        <Card 
                        bg="cyan-700"
                        bordercolor="cyan-300"
                        className="flex flex-col">
                            <h2 className="mr-auto">Humidity</h2>
                            <p className="mr-auto">{weather.data[0].humidity}%</p>

                        </Card>
                        <Card 
                        bg="cyan-700"
                        bordercolor="cyan-300"
                        className="flex flex-col">
                            <h2 className="mr-auto">Weather</h2>
                            <div className="flex items-center justify-center mr-auto">
                                <p className="mr-5">{weatherCodes[weather.data[0].weather].name}</p>
                                <Image 
                                alt="sarpsborg" 
                                width={"32"} 
                                height={"32"}
                                src={`/weathericons/${weatherCodes[weather.data[0].weather].code != "clearsky" 
                                ? `${weatherCodes[weather.data[0].weather].code}` : `${timeofday ? 'day' : 'moon'}`}.svg`} />
                            </div>

                        </Card>
                        
                    </div>
                }   

        </Card>

        {/* <Card
        bg="cyan-800"
        bordercolor="cyan-300"
        className="w-4/5 mx-auto h-full">



        </Card> */}

        </div>

    </Layout>
  )
}

export default weather