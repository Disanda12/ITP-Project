import React, { Component } from 'react'
import axios from 'axios'

export default class StaffSalary extends Component {

    
    constructor(props){
        super(props);
        
        
        this.state={
            StaffDetails:[]
        };
    }
    
     componentDidMount(){
         this.retriveStaffDetails();
      
     }
  
    retriveStaffDetails(){
      axios.get('/Staffdetails/retrive')
          .then(response => this.setState({ StaffDetails:response.data.existingStaffdetails }))
          .catch(error => {
              this.setState({ errorMessage: error.message });
              console.error('There was an error!', error);
          });
  }
  
  filterData(StaffDetails,searchKey){
    const result = StaffDetails.filter((StaffDetails) =>
    StaffDetails.RegistationNumber.toLowerCase().includes(searchKey)||
    StaffDetails.FirstName.toLowerCase().includes(searchKey)||
    StaffDetails.LastName.toLowerCase().includes(searchKey)

   
    )
    this.setState({StaffDetails:result})
  }
  
  
  
   handleSearchArea = (e) =>{
    const searchKey = e.currentTarget.value;
       
    axios.get("/Staffdetails/retrive").then(res=>{
        if(res.data.success){
            this.filterData(res.data.existingStaffdetails,searchKey)
        }
    });
  
  }
  
     
    
    render() {
        return (
            <div>
                 <div className="container-xxl">
               <center><h2 style={{textDecoration:'none', color:'#333399'}}><b><u> Salary Calculation for Non-Academic Staff</u></b></h2></center>
                </div>
                <br/><br/>
                <div className="col-lg-9 mt-2 mb-2">
                     <input
                            className="form-control"
                            type="search"
                            placeholder="Search here for the Payments you did for the courses"
                            name="searchQuery"
                            onChange={this.handleSearchArea}>
                     </input>
                </div>
                <br/><br/>
                <div className="container-xxl">              
                <table className="table table-success table-striped table-bordered">
                <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Registation Number</th>
                            <th scope="col">First Name </th>
                            <th scope="col">LastName </th>
                            <th scope="col">BasicSalary </th>
                            <th scope="col">Calculate Staff Salary</th>
                          </tr>
                    </thead>
               <tbody>
                {this.state.StaffDetails.map((StaffDetails,index)=>(
                       <tr>
                       <th scope="row">{index+1}</th>
                           <td>{StaffDetails.RegistationNumber}</td>
                           <td>{StaffDetails.FirstName}</td>
                           <td>{StaffDetails.LastName}</td>
                           <td>{StaffDetails.BasicSalary}</td>
                           <td>
                                       <a  className="btn btn-warning" href={`/calculatestaffsalry/${StaffDetails._id}`} style={{textDecoration:'none', color:'black'}}>
                                        <i><b>Calculate Staff Salary</b></i>
                                       </a>
                                     
                                   </td>
                   </tr>  
                ))}
                </tbody>
                </table>
                   
               </div>
            </div>
        )
    }
}
