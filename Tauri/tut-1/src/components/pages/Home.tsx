import Page from "../Layout/Page"

interface Props {
    page: number
    pageValue: number
    loaded: boolean
}

const Home = ({page, pageValue, loaded}:Props) => {
  return (
    <Page page={page} pageValue={pageValue} loaded={loaded}>
        <h1>Chatapp</h1>
        <p>Last online: 13.06.2023</p>
    </Page>
  )
}

export default Home