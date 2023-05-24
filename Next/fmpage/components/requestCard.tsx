import Link from "next/link"
import { ReactElement, useEffect, useRef, useState } from "react"
import { Request } from "@/pages/admin"


interface Props {
    request: Request
}

const RequestCard = ({request}:Props) => {

  return (
    <div key={request._id} className='bg-green-700 border-2 border-green-300 flex flex-col gap-5
    p-4 rounded-lg w-full'>
      <Link href={`mailto:${request.email}`} className='button-style-1'>{request.email}</Link>
      <div className='w-full flex lg:flex-row flex-col gap-5'>
        <div className='w-full h-fit flex flex-col gap-5'>
          <div className='bg-white p-4 rounded-lg'>
            <p>Name: {request.fullname}</p>
            <p>Gender: {request.gender}</p>
            <p>Birthdate: {request.birthdate}</p>
            <p>Country of birth: {request.bornin}</p>
            <p>Country of death: {request.diedin.length > 0 ? request.diedin : "Not dead"}</p>
          </div>
          <div className='bg-white p-4 rounded-lg'>
            <p>Mother: {request.mother}</p>
            <p>Father: {request.father}</p>
            <div>
              {
                request.children.length > 0 ?
                request.children.map((child:any, index:number) => (
                  <p key={index}>Child {index + 1}: {child}</p>
                ))
                : <p>No Children</p>
              }
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg'>
            <p>Extra info: <span>{request.extrainfo}</span></p>
          </div>
        </div>
        <div className="w-full h-fit max-h-full overflow-y-auto">
           
        </div>        
      </div>
    </div>
  )
}

export default RequestCard


// {
//   request.imageIds.content.map((image:string, index:number) => (
//     <div className='button-style-1 flex justify-center items-center cursor-move'>
//       <img key={index} src={image}  />
//     </div>
//   ))
// }