import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash';


const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({})

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    useEffect(() => {
        // call apis
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            console.log(res)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
            setListUsers(res.data)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }

    const handleEditUserFromModal = (user) => {
        let cloneListusers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        console.log('>> ck user: ', user)
        cloneListusers[index].first_name = user.first_name;
        setListUsers(cloneListusers);
        console.log(listUsers, cloneListusers)
        console.log('>>>check index: ', index);
    }

    return (
        <>
            <div className='my-3 add-new d-flex justify-content-between'>
                <span><h3>List Users:</h3></span>
                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddNew(true)}
                >
                    Add new user
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Avatar</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td><img src={item.avatar} /></td>
                                    <td>
                                        <button className='btn btn-warning mx-3'
                                            onClick={() => handleEditUser(item)}
                                        >Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />

            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleUpdateTable={handleUpdateTable}
                handleEditUserFromModal={handleEditUserFromModal}
            />


        </>)
}

export default TableUsers;