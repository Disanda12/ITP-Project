import React, { Component,useState,useEffect } from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios';

import Homeheader from './components/Homeheader';
import Homefooter from './components/Homefooter';



import Apply from './components/Apply'

import Specialevents from './components/Specialevents';
import Loginpage from './components/Loginpage';
import middle from './components/Middle';
import Aboutus from './components/Aboutus';
import Displaytimetables from './components/Displaytimetables';

import Courses from './components/Courses';
import Login from './components/Login';
import Course from './components/Course';



  function App() {

     

      const[posts , setPosts] = useState([])
    
      useEffect(() => {
    
        axios.get('http://localhost:8000/courses')
        .then(res => setPosts(res.data) )
        .catch(error => console.log(error));
    
    
      })



    return (
    <BrowserRouter>
      <div>

        <Route path=""  component={Homeheader}></Route>

        <Route path="/apply"  component={Apply}></Route>   

        <Route path="/middle" component={middle}></Route>
        <Route path="/special" component={Specialevents}></Route>
        <Route path="/about" component={Aboutus}></Route>
        <Route path="/admin"  component={Loginpage}></Route>
        <Route path="/displaytimetables" component={Displaytimetables}></Route>

        <Route  path="/course"  render={()=> <Courses posts={posts} />} />
        <Route  path="/allCourse"  component={Login} />
        <Route path="/course/:id"    render={(props)=>  <Course {...props} posts={posts} />} />


        <Route path="" component={Homefooter}></Route>

      </div>
    </BrowserRouter>
    )
  }

  export default App;

