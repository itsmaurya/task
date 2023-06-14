import React, { useState } from 'react'
import { useEffect } from 'react';
import "./App.css"

export const ApiData = () => {

    const [data,setData]=useState([])
    const [id,setId]=useState(data[0])
    useEffect(() => {
        fetch('https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20')
          .then(response => response.json())
          .then(data => {
            setData(data.results);
          })
          .catch(error => {
            console.error('Error:', error);
          });
          
      }, []);
      useEffect(()=>{
        setId(data[0])
      },[data])
      function change(key){
        const user = data.find((user,index) => index === key);
        
            setId(user)
        
        

      }
  return (
    <>
    <div className='container'>
        
    {id && (
          <div className='box'>
            <div className='box-image'>
              <img src={id.picture.large} alt='User Thumbnail' />
            </div>
            <div className="details">
            <h2 className='box-name'>{id.name.first} {id.name.last}</h2>
            <p className='box-address'>{id.location.street.number}, {id.location.street.name}, {id.location.city}, {id.location.state}, {id.location.country}, {id.location.postcode}</p>
            <p className='box-timezone'>{id.location.timezone.offset} {id.location.timezone.description}</p>
            <p className='box-gender'>{id.gender}</p>
            </div>
          </div>
        )}
    </div>
    <div className='data' >
         {data.map((user, index) => (
        <div className='data-box' onClick={()=>change(index)} key={index}>
          
          <p className='gender'>{user.gender}</p>
          <p className='name'>{user.name.first} {user.name.last}</p>
          <p className='email'>{user.email}</p>
          
          <hr />
        </div>
      ))}
    </div>
    </>
  )
}
