import { Flex, Heading, VStack } from "@chakra-ui/react";
import CreateListing from "../components/CreateListing";
import DisplayListing from "../components/DisplayListing";

export default function Shop(){

    return(
        <div>
            <Flex alignContent='center' justifyContent='center'>
                <VStack>
                    <Heading>Shop our Stock!</Heading>
                    <CreateListing/>
                </VStack>
            </Flex>
            <DisplayListing/>
        </div>
    )
}