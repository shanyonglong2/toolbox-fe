import { useState} from "react";
import {
    Heading,
    Card,
    Image,
    Stack,
    CardBody,
    Text,
    Box,
    Link, useDisclosure, useToast,
} from '@chakra-ui/react';
import {
    DeleteIcon,
    EditIcon,
    ExternalLinkIcon,
} from '@chakra-ui/icons'
import {AlterDialog} from "./AlterDialog";
import {deleteTool} from '../api/api';
import {UpdateToolDialog} from "./UpdateToolDialog";

let deletedID = ""
export function ToolCard(props) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedTool, setSelectedTool] = useState({id:"", name:"", url:"", description:"", profile:""});
    const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
    const deleteItem = (id)=>{
        deletedID = id;
        onOpen();
    }
    const updateItem = ()=>{
        setSelectedTool({
            id: props.id,
            name: props.title,
            url: props.url,
            description: props.description,
            profile: props.profile,
        })
        setUpdateDialogVisible(true);
    }
    const doDelete = ()=>{
        deleteTool(deletedID, (data)=>{
            toast({
                title: '删除成功',
                description: "工具已删除",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            props.refresh();
        }, (err)=>{
            toast({
                title: '删除工具失败',
                description: err,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
        onClose();
    }
    return <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
  >
    <Box marginTop={10} marginLeft={5}>
        <Image
        // objectFit='cover'
        w={{ sm: '80px' }}
        h={{ sm: '70px' }}
        src={props.icon}
        alt='Caffe Latte'
        />
    </Box>
    <Stack>
      <CardBody>
        <Heading size='md'>{props.title}</Heading>
        <Text py='2' h={'20'} w={'40'} style={{"overflow":"auto"}}>
          {props.description}
        </Text>
          <Link href={props.url} isExternal>
              <ExternalLinkIcon mx='2px' />打开
          </Link>
          <span hidden={!props.editable}>
              <Link
                  isExternal
                  marginLeft={2}
                  onClick={()=>updateItem()}
              >
                  <EditIcon mx='2px' />编辑
              </Link>
              <Link
                  color='red.400'
                  onClick={()=>deleteItem(props.id)}
                  isExternal
                  marginLeft={2}>
                  <DeleteIcon mx='2px' />删除
              </Link>
          </span>
      </CardBody>
    </Stack>

        <AlterDialog
            onClose={onClose}
            isOpen={isOpen}
            title={"删除工具"}
            body={"确定要删除工具吗？"}
            okText={"删除"}
            onOK={doDelete}
        />
        <UpdateToolDialog
            isOpen={updateDialogVisible}
            onClose={()=>setUpdateDialogVisible(false)}
            onUpdated={props.refresh}

            tool={selectedTool}
            setName={(name)=>{setSelectedTool({...selectedTool, name:name})}}
            setDescription={(description)=>{setSelectedTool({...selectedTool, description:description})}}
            setURL={(url)=>{setSelectedTool({...selectedTool, url:url})}}
        />
  </Card>
}