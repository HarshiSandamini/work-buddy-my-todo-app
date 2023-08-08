import React from 'react'
import {BsFillArrowLeftCircleFill} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import "../index.css"


const BackIcon = () => {
    const navigate = useNavigate()
    const backSingup = () => {
        navigate('/')
    }

  return (
    <div>
        <div>
          <BsFillArrowLeftCircleFill onClick={backSingup} className='bicon'/>
        </div>
    </div>
  )
}

export default BackIcon
