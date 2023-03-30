import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
export function AlterDialog(props){
    return <AlertDialog
        isOpen={props.isOpen}
        onClose={props.onClose}
    >
        <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    {props.title}
                </AlertDialogHeader>

                <AlertDialogBody>
                    {props.body}
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button onClick={props.onClose}>
                        取消
                    </Button>
                    <Button colorScheme='red' onClick={props.onOK} ml={3}>
                        {props.okText}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
}