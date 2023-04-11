import {useEffect, useState, useCallback} from "react";
import {
  ChakraProvider,
  Heading,
  Box,
  Tabs,
  TabList,
  Tab,
  Link,
  TabPanels,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import {
  Panel,
} from './Panel';

import {
  LoginModal,
} from './components/LoginModal';
import {
  AlterDialog,
} from './components/AlterDialog';

import {
  CreateToolDialog
}from './components/CreateToolDialog';

import {
  CreateColumnDialog
}from './components/CreateColumnDialog';

import {
  UpdatePasswordDialog
}from './components/UpdatePasswordDialog'

import {
  AddIcon,
  HamburgerIcon,
  ExternalLinkIcon,
  ArrowBackIcon,
  LockIcon,
} from '@chakra-ui/icons'

import { useDisclosure } from '@chakra-ui/react'

import {listColumns, listTools} from './api/api';

const modeCustomer = "customer";
const modeAdmin = "admin";
function App() {
  const toast = useToast();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [tools, setTools] = useState([]);
  const [mode, setMode] = useState(modeCustomer);
  const [columnsList, setColumnsList] = useState([]);
  const [createToolDialogVisible, setCreateToolDialogVisible] = useState(false);
  const [createColumnDialogVisible, setCreateColumnDialogVisible] = useState(false);
  const [updatePasswordDialogVisible, setUpdatePasswordDialogVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(Number(localStorage.getItem('tabIndex') || 0));
  const fetchTools = useCallback(() => {
    listTools((data)=>{
      setTools(data.data);
    }, (err)=>{
      toast({
        title: '获取数据失败',
        description: err,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    });
  }, []);

  const fetchToken = useCallback(() => {
    if(sessionStorage.getItem("token") != "" && sessionStorage.getItem("token") != null){
      setMode(modeAdmin);
    }
  }, []);
  const fetchColumns = useCallback(() => {
    listColumns((data)=>{
      setColumnsList(data.data);
    }, (err)=>{
      toast({
        title: '获取栏目数据失败',
        description: err,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    });
  }, []);
  const getDefaultIndex = useCallback(() => {
    localStorage.getItem("tabIndex");
  }, []);

  useEffect(function (){
    fetchTools();
    fetchToken();
    fetchColumns();
  }, [fetchTools,fetchToken]);

  const onLogin = (() => {
    setLoginModalVisible(false);
    setMode(modeAdmin);
  });

  const onCreateTool = (() => {
    fetchColumns();
    setCreateToolDialogVisible(true);
  })

  const logout=()=>{
    sessionStorage.removeItem("token");
    setMode(modeCustomer);
    onClose();
  }

  const onTabChange = (index) => {
    setTabIndex(index);
    localStorage.setItem("tabIndex", index);
  }

  return (
    <ChakraProvider>
      <Box padding={5}>
        <Box
            visibility={mode == modeCustomer ? "visible": "hidden"}
            float={'right'}>
          <Link
              onClick={() => {setLoginModalVisible(true)}}
          >登录</Link>
        </Box>

        <Box
            visibility={mode == modeAdmin ? "visible": "hidden"}
            float={'right'}>
          <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
            />
            <MenuList>
              <MenuItem
                  onClick={()=>onCreateTool()}
                  icon={<AddIcon />}>
                新建工具
              </MenuItem>
              <MenuItem
                  onClick={()=>setCreateColumnDialogVisible(true)}
                  icon={<ExternalLinkIcon />}>
                新建栏目
              </MenuItem>
              <MenuItem
                  onClick={()=>setUpdatePasswordDialogVisible(true)}
                  icon={<LockIcon />}>
                修改密码
              </MenuItem>
              <MenuItem
                  onClick={onOpen}
                  icon={<ArrowBackIcon />}>
                退出登录
              </MenuItem>
            </MenuList>
          </Menu>

        </Box>
        <Box padding={5}>
          <Heading>媒体云工具集 v0.2</Heading>
        </Box>
        <Box padding={5}>
          <Tabs 
            index={tabIndex}
            colorScheme='blue' 
            onChange={onTabChange}>
            <TabList>
              {tools.map((tool, index) => {
                return <Tab>{tool.name}</Tab>;
              })}

            </TabList>

            <TabPanels marginTop={4}>
                {tools.map((tool, index) => {
                  return <TabPanel>
                    <Panel
                        columns={tool.columns}
                        editable={mode == modeAdmin}
                        refresh={fetchTools}
                    />
                  </TabPanel>
                })}

            </TabPanels>
          </Tabs>
        </Box>

        <LoginModal
            visible={loginModalVisible}
            onClose={() => setLoginModalVisible(false)}
            onLogin={() => onLogin()}
              />
        <AlterDialog
            onClose={onClose}
            isOpen={isOpen}
            title={"退出登录"}
            body={"确定要退出登录吗？"}
            okText={"确定"}
            onOK={logout}
        />
        <CreateToolDialog
          isOpen={createToolDialogVisible}
          onClose={()=>setCreateToolDialogVisible(false)}
          onCreated={fetchTools}
          columns={columnsList}
        />
        <CreateColumnDialog
            isOpen={createColumnDialogVisible}
            onClose={()=>setCreateColumnDialogVisible(false)}
            onCreated={fetchTools}
        />
        <UpdatePasswordDialog
            isOpen={updatePasswordDialogVisible}
            onClose={()=>setUpdatePasswordDialogVisible(false)}
            onCreated={()=>{}}
        />
      </Box>
    </ChakraProvider>
  );
}

export default App;
