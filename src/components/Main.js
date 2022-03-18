import {useEffect, useState} from "react"
import {Route, Switch} from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"

function Main(props){
    const [affirms, setAffirms] = useState(null)
    
     const URL = "https://affirm-backend.herokuapp.com/affirms/"

    const getAffirms = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setAffirms(data)
    }

    const createAffirms = async (affirm) => {
        await fetch(URL, {
            method: "post", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(affirm)
        })

        getAffirms()
    }

    const updateAffirms = async (affirm, id) => {
        // make the put request to update a one cheese
        await fetch(URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(affirm)
        })
        // update list of one cheese
        getAffirms()
    }

    const deleteAffirms = async (id) => {
      //make delete request 
      await fetch(URL + id, {
        method: "delete",
      })
      //update list of people
      getAffirms()
    }

    useEffect(() => {
        getAffirms()
    }, [])
  
  
    return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index affirms={affirms} createAffirms={createAffirms} />
        </Route>
        <Route
          path="/affirms/:id"
          //the way router props are made available is through this function
          //router props are "rp", we do this so show gets them as props. 
          //
          render={rp => (
            <Show
              affirms={affirms}
              updateAffirms={updateAffirms}
              deleteAffirms={deleteAffirms}
              //because the router props are an object and 
              //Im going to spread the object so I can show all of its props
              //we do this so we can make each individual property its own props
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  )
}

export default Main

   