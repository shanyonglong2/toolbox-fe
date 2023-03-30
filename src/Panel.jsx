
import {
    Heading,
    Box,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { ToolCard } from "./components/ToolCard";
import {profileURL} from "./api/api";
export function Panel(props) {
    return <Box>
        {props.columns.map((item) => {
            return <Box>
                <Heading size='md'>
                    {item.name}
                </Heading>

                <Grid templateColumns='repeat(4, 1fr)' padding={4} gap={6}>
                    {item.tools != undefined && item.tools.map((grid)=>{
                        return <GridItem w='100%' >
                        <ToolCard
                            id={grid.id}
                            title={grid.name}
                            description={grid.description}
                            url={grid.url}
                            icon={profileURL(grid.profile)}
                            profile={grid.profile}
                            editable={props.editable}
                            refresh={props.refresh}
                        />
                    </GridItem>
                    })}
                </Grid>
            </Box>
        })}
    </Box>
}