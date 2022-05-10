import { useState } from "react"
function Show(props) {
  const id = props.match.params.id
  const affirms = props.affirms
  const affirm = affirms.find((p) => {
        return p._id === id
    })

  const [editForm, setEditForm] = useState(affirm)

  // handleChange function for form
  const handleChange = event => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.updateAffirms(editForm, affirm._id)
    props.history.push("/")
  }

  const removeAffirm = () => {
    props.deleteAffirms(affirm._id)
    props.history.push("/")
  }

    return (
      
    <div className="affirm">
      
      <h1>{affirm.date}</h1>
      <h2>{affirm.affirmation}</h2>
      <img src={affirm.confirmation} alt={affirm.name} />
      <h2>{affirm.feeling}</h2>
      <button id="delete" onClick={removeAffirm}>Delete</button>

        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={editForm.date}
                name="date"
                placeholder="date"
                onChange={handleChange}
                
            />
            <input 
                type="text"
                value={editForm.affirmation}
                name="affirmation"
                placeholder="affirmation"
                onChange={handleChange}
                
            />

            <input
                type="text"
                value={editForm.confirmation}
                name="confirmation"
                placeholder="confirmation"
                onChange={handleChange}
                />

            <input
                type={Number}
                value={editForm.feeling}
                name="feeling"
                placeholder="feeling"
                onChange={handleChange}
            />
            <input type="submit" value="Update Affirm"/>
            
        </form>
    </div>
  )
}

export default Show