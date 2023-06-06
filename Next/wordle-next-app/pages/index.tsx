import axios from 'axios'

export default function Home() {

  const call = async () => {
    const response = await axios.post("/api/auth/register");
    console.log(response.data)
  }

  return (
    <>
      <button onClick={call} >Call</button>
    </>
  )
}
