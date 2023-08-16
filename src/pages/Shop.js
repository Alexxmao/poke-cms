import CreateListing from "../components/CreateListing";
import axios from "axios"
import { useState, useEffect } from "react";
import DisplayListing from "../components/DisplayListing";

export default function Shop(){

    return(
        <div>shop
            <CreateListing/>
        </div>
    )
}