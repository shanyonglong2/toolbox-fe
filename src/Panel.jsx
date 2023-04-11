import React, { useState } from 'react';
import {
    Heading,
    Box,
    Grid,
    GridItem,
    HStack,
    IconButton,
} from '@chakra-ui/react';
import {
    SettingsIcon,
} from '@chakra-ui/icons'
import { ToolCard } from "./components/ToolCard";
import { UpdateColumnDialog } from "./components/UpdateColumnDialog"
import { profileURL } from "./api/api";
export function Panel(props) {
    const [updateColumnDialogVisible, setUpdateColumnDialogVisible] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState({});
    const onSettingClicked = (column) => {
        setSelectedColumn(column);
        setUpdateColumnDialogVisible(true);
    }
    return <Box>
        {props.columns.map((item) => {
            return <Box>
                <HStack>
                    <Heading size='md'>
                        {item.name}
                    </Heading>
                    <Box hidden={!props.editable}>
                        <IconButton 
                            variant='ghost' 
                            colorScheme='blue' 
                            size='sm' 
                            aria-label='设置栏目' 
                            marginLeft={-2}
                            paddingTop={1}
                            icon={<SettingsIcon />} 
                            onClick={()=>onSettingClicked(item)}/>
                    </Box>
                </HStack>
                <Grid templateColumns='repeat(4, 1fr)' padding={4} gap={6}>
                    {item.tools != undefined && item.tools.map((grid) => {
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

        <UpdateColumnDialog 
            isOpen={updateColumnDialogVisible}
            onClose={()=>setUpdateColumnDialogVisible(false)}
            onUpdated={props.refresh}
            column={selectedColumn}
            setPriority={(priority)=>{setSelectedColumn({...selectedColumn, priority: priority})}}
        />
    </Box>
}