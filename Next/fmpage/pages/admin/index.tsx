import Layout from '@/components/Layout'
import useUserStore, { StoreUser } from '@/store/userstore'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from "next";
import axios, { AxiosError } from 'axios';
import RequestCard from '@/components/requestCard';
import MemberCard from '@/components/memberCard';

export const getServerSideProps:GetServerSideProps<Props> = async ({req, res}) => {

  const response1 = await axios.get('http://localhost:3000/api/admin/requests');
  const response2 = await axios.get('http://localhost:3000/api/admin/members');
  
  return {
    props: {
      requestsData: response1.data.data,
      membersData: response2.data.data
    }
  }
}

export type Request = {
  _id: string,
  __v: number,
  email: string,
  fullname: string,
  gender: string,
  birthdate: string,
  deathdate: string,
  bornin: string,
  diedin: string,
  father: string,
  mother: string,
  extrainfo: string,
  children: Array<string>,
  imageIds: {
    folderID: string,
    content: []
  }
}

interface Props {
  requestsData: Request[]
  membersData: Request[]
}

const login = ({requestsData, membersData}:Props) => {
    const store = useUserStore();
    const [user, setUser] = useState<StoreUser>();
    const [activeEdit, setActiveEdit] = useState({
      requests: true,
      members: false
    })
    const [requests,setRequests] = useState<Request[]>([])
    const [members,setMembers] = useState<Request[]>([])

    useEffect(() => {
        if (!store.status) return;
        setUser(store.user);

    }, [store.status])

    useEffect(() => {
      if (!requestsData) return
      setRequests(requestsData)
    }, [requestsData])

    useEffect(() => {
      if (!membersData) return
      setMembers(membersData)
    }, [membersData])

    const handleAccept = async (data:Request) => {
      try {
        const notData = requests.filter((request:Request) => request._id != data._id)
        console.log(notData)
        setRequests(notData)
        
        const response = await axios.post('/api/admin/requests', {body: data, type: "ACCEPT"})
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error)
        }
      }
    }
    
    const handleDelete = async (id:string) => {
      try {
  
        const thisRequest = requests.find((request:Request) => request._id === id)
        console.log(thisRequest)
        // const response = await axios.post('/api/admin/requests', {body: request, type: "DELETE"})

      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error)
        }
      }
    }

  return (
    <Layout>
        
      <div className='w-4/5 mx-auto mt-20 flex flex-col gap-10'>

        <div className='p-4 bg-green-800 rounded-lg flex gap-5'>
          <button type='button' className='button-style-1' onClick={() => setActiveEdit({
            requests: !activeEdit.requests,
            members: false
          })}>Requests</button>
          <button type='button' className='button-style-1' onClick={() => setActiveEdit({
            requests: false,
            members: !activeEdit.members
          })}>Members</button>
        </div>

        {
          activeEdit.requests === true &&
          <div className='p-4 bg-green-800 rounded-lg flex flex-col gap-5'>
            <h1 className='text-white bg-green-700 border-2 border-green-300 flex 
            flex-col gap-10 p-4 rounded-lg w-full'>Requests</h1>
            {
              requests.length > 0 ?
              requests.map((request:Request) => (
                <RequestCard 
                  key={request._id} 
                  request={request} 
                  acceptFunction={handleAccept} 
                  deleteFunction={handleDelete} /> 
              ))
              :
              <p className='text-white'>No requests right now!</p>
            }
          </div>
        }
        {
          activeEdit.members === true &&
          <div className='p-4 bg-green-800 rounded-lg flex flex-col gap-5'>
            <h1 className='text-white bg-green-700 border-2 border-green-300 flex 
            flex-col gap-10 p-4 rounded-lg w-full'>Members</h1>
            {
              members.length > 0 ?
              members.map((member:Request) => (
                <MemberCard 
                  key={member._id} 
                  member={member} 
                  acceptFunction={handleAccept} 
                  deleteFunction={handleDelete} /> 
              ))
              :
              <p className='text-white'>No Members right now!</p>
            }
          </div>
        }
      </div>
    </Layout>
  )
}

export default login