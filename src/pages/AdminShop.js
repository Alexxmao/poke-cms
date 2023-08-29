import { Flex, Heading, VStack } from "@chakra-ui/react";
import CreateListing from "../components/CreateListing";
import DisplayListing from "../components/DisplayListing";

export default function AdminShop(){

    return(
        <div>
            <Flex alignContent='center' justifyContent='center'>
                <VStack spacing={8}>
                    <Heading>Shop our Stock!</Heading>
                    <CreateListing admin={true}/>
                </VStack>
            </Flex>
            <DisplayListing admin={true}/>
        </div>
    )
}