import {useState} from "react"
import {Link} from "react-router-dom"

function Index(props){
//adding a state to our form
    const [newForm, setNewForm] = useState({
    date: "",
    affirmation: "",
    confirmation: "",
    feeling: "",
  });

  // handleChange function for form
  //i want to change the property that has the name of the input 
  //and I want the target to match the value
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
      //it just makes sure the page doesnt refresh itself
      //im gonna pass create people the state in our new form
      //after form updates I want it to go back to a blank form
      //so thats why we set new form
    event.preventDefault();
    props.createAffirms(newForm);
    setNewForm({
      date: "",
      affirmation: "",
      confirmation: "",
      feeling: "",
    });
  };

    // loaded function
  const loaded = () => {

    
    return props.affirms.map((affirm) => (
      <div key={affirm._id} className="affirm" background="black">
        <hr></hr>
        <Link to={`/affirms/${affirm._id}`}><h1>{affirm.date}</h1></Link>
        <h3>{affirm.affirmation} {affirm.name} </h3>
        <h3>{affirm.confirmation}</h3>
        <h3>{affirm.feeling}</h3>
        <hr></hr>
      </div>
      
    ));
  };
  
  const loading = () => {
        return <h1>Loading...</h1>
    }

      
  return <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.date}
          name="date"
          //tell the user knows what to type in there
          placeholder="date"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.affirmation}
          name="affirmation"
          //tell the user knows what to type in there
          placeholder="affirmation"
          onChange={handleChange}
        />
        <input
          type="text"
          //the value is connected to the image 
          value={newForm.confirmation}
          //the name is the image
          name="confirmation"
          //so the user knows what to put in that box
          placeholder="confirmation"

          onChange={handleChange}
        />
        <input
          type={Number}
          value={newForm.feeling}
          name="feeling"
          placeholder="feeling"
          onChange={handleChange}
        />
        <input type="submit" value="Create Affirmation" />
      </form>
      {props.affirms ? loaded() : loading()}
    </section>
} 
export default Index