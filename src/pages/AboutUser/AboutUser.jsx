import React from 'react'
import { useParams } from 'react-router-dom';

export default function AboutUser() {
    const {userID} = useParams();
  return (
    <div>AboutUser {userID}</div>
  )
}
