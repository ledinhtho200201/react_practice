import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;


    const handleDeleteUser = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && res.statusCode === 204) {
            toast.success('User deleted successfully');
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error('User deletion failed');
        }
        console.log('>>> check res: ', res)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user?
                    <br />
                    <b>email = {dataUserDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm;