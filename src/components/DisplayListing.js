import axios from "axios"
import { useState, useEffect } from "react";

export default function DisplayListing() {

const [listings, setListings] = useState([]);

useEffect(() => {
    getListings();
}, []);

const getListings = () => {
    axios.get('http://localhost:31337/api/listings/').then((response)=>{
        console.log(response.data);
        setListings(response.data);
    });
}

console.log(typeof listings)

    return(
        <div>
            <h1>LISTINGS</h1>
            <table>
                <thead>
                </thead>
                <tbody>
                    {Object.values(listings).map((listing, key) =>
                        <tr key={key}>
                            <td>{listing.id}</td>
                            <td>{listing.name}</td>
                            <td>{listing.type}</td>
                            <td>{listing.price}</td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}