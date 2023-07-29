import React from 'react'
import {BsFillArrowLeftCircleFill} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'


const BackIcon = () => {
    const navigate = useNavigate()
    const backSingup = () => {
        navigate('/')
    }

  return (
    <div>
        <div>
          <BsFillArrowLeftCircleFill onClick={backSingup}/>
        </div>
    </div>
  )
}

export default BackIcon
